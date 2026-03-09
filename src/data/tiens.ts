import { initialDbData } from "./initialData";

export const getProducts = (lang: 'en' | 'ar') => {
  const rawProducts = initialDbData.products[lang];
  const arProducts = initialDbData.products['ar']; // Master source for shared fields
  const inventory = initialDbData.inventory;
  const prices = initialDbData.prices;

  return Object.values(rawProducts).map(product => {
    // Find the Arabic counterpart
    const arProduct = (arProducts as any)[product.id];
    
    // Start with the current language product
    let finalProduct = { ...product };

    // If we have the Arabic master record, sync shared fields
    // This ensures that editing price/image in the Arabic list updates English too
    if (arProduct) {
      finalProduct.price = arProduct.price;
      finalProduct.image = arProduct.image;
      finalProduct.currency = arProduct.currency;
      // We also sync base inStock status from AR, though inventory rule overrides this later
      finalProduct.inStock = arProduct.inStock; 
    }

    // Determine the lookup name for rules (Always use Arabic Name)
    const lookupName = arProduct ? arProduct.name : product.name;

    // Apply Inventory Rule
    if ((inventory as any)[lookupName] !== undefined) {
      finalProduct.inStock = (inventory as any)[lookupName];
    }

    // Apply Price Rule (only if non-zero)
    if ((prices as any)[lookupName] !== undefined && (prices as any)[lookupName] !== 0) {
      finalProduct.price = (prices as any)[lookupName];
    }

    return finalProduct;
  });
};

export const getPackages = (lang: 'en' | 'ar') => {
  const isAr = lang === 'ar';
  return [
    {
      name: isAr ? 'البرونزية' : 'Bronze',
      bv: 100,
      bonus: '8% - 10%',
      weeklyCap: '$800',
      color: 'bg-amber-700',
    },
    {
      name: isAr ? 'الفضية' : 'Silver',
      bv: 200,
      bonus: '10% - 15%',
      weeklyCap: '$1,600',
      color: 'bg-slate-400',
    },
    {
      name: isAr ? 'الذهبية' : 'Gold',
      bv: 400,
      bonus: '12% - 20%',
      weeklyCap: '$3,000',
      color: 'bg-yellow-500',
    },
    {
      name: isAr ? 'البلاتينية' : 'Platinum',
      bv: 800,
      bonus: '15% - 25%',
      weeklyCap: '$5,000',
      color: 'bg-slate-800',
    },
  ];
};

export const getRanks = (lang: 'en' | 'ar') => {
  const isAr = lang === 'ar';
  return [
    { stars: 3, requirement: '< 200 PV' },
    { stars: 4, requirement: '200 PV (APPV)' },
    { stars: 5, requirement: '1,200 PV (ATNPV)' },
    { stars: 6, requirement: '5,000 PV (ATNPV)' },
    { stars: 7, requirement: isAr ? '25,000 PV + خطين 6 نجوم' : '25,000 PV (ATNPV) + 2x 6-star lines' },
    { stars: 8, requirement: isAr ? '100,000 PV + خطين 7 نجوم' : '100,000 PV (ATNPV) + 2x 7-star lines' },
  ];
};

export const getHonoraryRanks = (lang: 'en' | 'ar') => {
  const isAr = lang === 'ar';
  return [
    { name: isAr ? 'الأسد البرونزي' : 'Bronze Lion', requirement: isAr ? 'خطين 8 نجوم' : '2x 8-star lines' },
    { name: isAr ? 'الأسد الفضي' : 'Silver Lion', requirement: isAr ? '3 خطوط 8 نجوم' : '3x 8-star lines' },
    { name: isAr ? 'الأسد الذهبي' : 'Gold Lion', requirement: isAr ? '4 خطوط 8 نجوم' : '4x 8-star lines' },
    { name: isAr ? 'المدير' : 'Director', requirement: isAr ? '4 خطوط أسد ذهبي' : '4x Gold Lion lines' },
    { name: isAr ? 'المدير الشرفي' : 'Honorary Director', requirement: isAr ? '4 خطوط مدير' : '4x Director lines' },
  ];
};
