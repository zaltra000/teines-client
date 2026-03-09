import { ref, get, set, child, onValue, off } from "firebase/database";
import { db } from "../lib/firebase";
import { initialDbData } from "../data/initialData";

export interface StoreProduct {
  id: string;
  name: string;
  category: string;
  element: string;
  price: number;
  currency: string;
  description: string;
  benefits: string[];
  image: string;
  inStock: boolean;
}

// Helper to process data (shared between fetch and subscribe)
const processProductsData = (productsData: any, inventory: any, prices: any, language: 'en' | 'ar'): StoreProduct[] => {
  if (!productsData) return [];

  const localInventory = initialDbData.inventory;
  const localPrices = initialDbData.prices;

  return Object.values(productsData).map((item: any) => {
    // Check if item has 'ar' and 'en' properties (Unified Structure)
    if (item.ar && item.en) {
      const langData = item[language];
      const arData = item['ar']; // For lookup name
      
      // Base product from language-specific data
      const product: StoreProduct = {
        id: item.id || langData.id,
        name: langData.name,
        category: langData.category || 'General',
        element: langData.element || 'None',
        description: langData.description || '',
        benefits: langData.benefits,
        currency: langData.currency || item.currency || (language === 'ar' ? 'SDG' : '₹'), // Fallback
        
        // Shared fields from root take precedence
        price: item.price !== undefined ? item.price : langData.price,
        image: item.image || langData.image,
        inStock: item.inStock !== undefined ? item.inStock : langData.inStock,
      };

      // Apply Rules (Inventory/Prices)
      // Use Arabic name for lookup if available, otherwise current name
      const lookupName = arData ? arData.name : product.name;

      // Prioritize Local File for Rules
      if ((localInventory as any)[lookupName] !== undefined) {
        product.inStock = (localInventory as any)[lookupName];
      } else if (inventory[lookupName] !== undefined) {
        product.inStock = inventory[lookupName];
      }

      if ((localPrices as any)[lookupName] !== undefined && (localPrices as any)[lookupName] !== 0) {
        product.price = (localPrices as any)[lookupName];
      } else if (prices[lookupName] !== undefined && prices[lookupName] !== 0) {
        product.price = prices[lookupName];
      }

      return product;
    } 
    return null;
  }).filter(Boolean) as StoreProduct[];
};

// Subscribe to real-time updates
export const subscribeToStoreProducts = (language: 'en' | 'ar', callback: (products: StoreProduct[]) => void) => {
  const dbRef = ref(db);
  const productsRef = child(dbRef, 'products');
  const inventoryRef = child(dbRef, 'inventory');
  const pricesRef = child(dbRef, 'prices');

  let productsData: any = null;
  let inventoryData: any = {};
  let pricesData: any = {};
  let isInitialLoad = true;

  const handleUpdate = () => {
    // Only process if we have the main products data
    if (productsData) {
      const processed = processProductsData(productsData, inventoryData, pricesData, language);
      callback(processed);
    } else if (!isInitialLoad && !productsData) {
       // If we loaded and got null, maybe fallback to local? 
       // For now let's just send empty or handle in UI.
       // But to match fetch behavior, we might want to seed or fallback.
       // Let's rely on the fact that if productsData is null, we haven't called callback yet 
       // or we send empty array.
    }
  };

  const unsubProducts = onValue(productsRef, (snap) => {
    productsData = snap.val();
    handleUpdate();
    isInitialLoad = false;
  });

  const unsubInventory = onValue(inventoryRef, (snap) => {
    inventoryData = snap.val() || {};
    handleUpdate();
  });

  const unsubPrices = onValue(pricesRef, (snap) => {
    pricesData = snap.val() || {};
    handleUpdate();
  });

  // Return unsubscribe function
  return () => {
    unsubProducts(); // onValue returns the unsubscribe function directly
    unsubInventory();
    unsubPrices();
  };
};

// Fetch products from Firebase Realtime Database (One-time fetch)
export const fetchStoreProducts = async (language: 'en' | 'ar'): Promise<StoreProduct[]> => {
  try {
    const dbRef = ref(db);
    // Fetch the entire products node and inventory/prices
    const [productsSnap, inventorySnap, pricesSnap] = await Promise.all([
      get(child(dbRef, `products`)),
      get(child(dbRef, `inventory`)),
      get(child(dbRef, `prices`))
    ]);
    
    if (productsSnap.exists()) {
      const productsData = productsSnap.val();
      const inventory = inventorySnap.exists() ? inventorySnap.val() : {};
      const prices = pricesSnap.exists() ? pricesSnap.val() : {};

      const mappedProducts = processProductsData(productsData, inventory, prices, language);

      // If mappedProducts is empty (maybe old structure), try fetching old path
      if (mappedProducts.length === 0) {
         const oldPathSnap = await get(child(dbRef, `products/${language}`));
         if (oldPathSnap.exists()) {
            throw new Error("Detected old structure or empty data, falling back");
         }
      }

      return mappedProducts;

    } else {
      // If no data exists, seed the database with our initial structure
      await initializeDatabase();
      
      // Fallback to local data (Old Structure)
      const rawProducts = Object.values(initialDbData.products[language]);
      const arProducts = initialDbData.products['ar'];
      const inventory = initialDbData.inventory;
      const prices = initialDbData.prices;

      return rawProducts.map(product => {
        const arProduct = (arProducts as any)[product.id];
        let finalProduct = { ...product };
        if (arProduct) {
          finalProduct.price = arProduct.price;
          finalProduct.image = arProduct.image;
          finalProduct.currency = arProduct.currency;
          finalProduct.inStock = arProduct.inStock;
        }
        const lookupName = arProduct ? arProduct.name : product.name;
        if ((inventory as any)[lookupName] !== undefined) finalProduct.inStock = (inventory as any)[lookupName];
        if ((prices as any)[lookupName] !== undefined && (prices as any)[lookupName] !== 0) finalProduct.price = (prices as any)[lookupName];
        return finalProduct;
      });
    }
  } catch (error) {
    console.error("Error fetching products from Firebase:", error);
    // Fallback to local data
    const rawProducts = Object.values(initialDbData.products[language]);
    const arProducts = initialDbData.products['ar'];
    const inventory = initialDbData.inventory;
    const prices = initialDbData.prices;

    return rawProducts.map(product => {
      const arProduct = (arProducts as any)[product.id];
      let finalProduct = { ...product };
      if (arProduct) {
        finalProduct.price = arProduct.price;
        finalProduct.image = arProduct.image;
        finalProduct.currency = arProduct.currency;
        finalProduct.inStock = arProduct.inStock;
      }
      const lookupName = arProduct ? arProduct.name : product.name;
      if ((inventory as any)[lookupName] !== undefined) finalProduct.inStock = (inventory as any)[lookupName];
      if ((prices as any)[lookupName] !== undefined && (prices as any)[lookupName] !== 0) finalProduct.price = (prices as any)[lookupName];
      return finalProduct;
    });
  }
};

// Initialize the database with the full structure provided
export const initializeDatabase = async () => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(dbRef);
    
    if (!snapshot.exists()) {
      await set(dbRef, initialDbData);
      console.log("Successfully initialized database with provided structure");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};
