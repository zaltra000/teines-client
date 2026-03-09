import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShoppingBag, Plus, Minus, Search, Loader2, Clock } from "lucide-react";
import { AnimatedPage } from "../components/AnimatedPage";
import { useLanguage } from "../contexts/LanguageContext";
import { StoreProduct } from "../services/storeService";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../hooks/useProducts";
import { CartDrawer } from "../components/CartDrawer";
import { cn } from "../utils/cn";

export function Store() {
  const { t, language } = useLanguage();
  const { products, isLoading } = useProducts();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart, updateQuantity, totalItems, items } = useCart();

  const getProductQuantity = (productId: string) => {
    return items.find(item => item.id === productId)?.quantity || 0;
  };

  // Dynamically generate categories from products
  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
  const categories = [
    { id: "All", label: t('store.all') || "All" },
    { id: t('products.categories.health'), label: t('products.categories.health') },
    { id: t('products.categories.beauty'), label: t('products.categories.beauty') },
    { id: t('products.categories.personal'), label: t('products.categories.personal') },
    { id: t('products.categories.household'), label: t('products.categories.household') },
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <AnimatedPage className="space-y-6 pb-32">
        {/* Header */}
        <div className="flex items-start justify-between px-4 pt-2">
          <h1 className="text-[2.5rem] font-serif text-[#0a0f0d] tracking-tight leading-[1.1] max-w-[70%]">
            Curated Marketplace
          </h1>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm text-slate-900 hover:bg-slate-50 transition-colors mt-1"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#c2a67a] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        <div className="px-4">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
            <input
              type="text"
              placeholder={t('store.search') || "Search products..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full py-4 pl-12 pr-4 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-6 py-2.5 rounded-full text-[14px] font-medium whitespace-nowrap transition-all duration-300",
                activeCategory === cat.id
                  ? "bg-[#d8cfc4] text-[#0a0f0d] shadow-sm"
                  : "bg-[#f3f4f6] text-slate-600 hover:bg-[#e5e5e5]"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-32 gap-4">
            <Loader2 className="w-8 h-8 text-[#c2a67a] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 px-4">
            {filteredProducts.map((product, index) => {
              const quantityInCart = getProductQuantity(product.id);
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3, ease: "easeOut" }}
                  className={cn(
                    "bg-white rounded-[1.5rem] p-3 border border-slate-100 shadow-sm flex flex-col gap-3 relative overflow-hidden will-change-transform",
                    !product.inStock && "opacity-90 grayscale-[0.8]"
                  )}
                >
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-white/40 z-10 pointer-events-none" />
                  )}
                  
                  <div className="relative aspect-square rounded-[1.2rem] overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={cn(
                        "w-full h-full object-cover mix-blend-multiply transition-all duration-500",
                        !product.inStock && "grayscale opacity-60 scale-105 blur-[1px]"
                      )}
                      referrerPolicy="no-referrer"
                    />
                    
                    {!product.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 z-20">
                        <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-white/60 flex items-center gap-2 transform translate-y-2">
                          <Clock size={14} className="text-slate-500" strokeWidth={2.5} />
                          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-700">Restocking</span>
                        </div>
                      </div>
                    )}

                    {product.inStock && (
                      <div className="absolute top-3 right-3 z-20">
                        <span className="backdrop-blur-md text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-white/20 bg-white/90 text-slate-900">
                          In Stock
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col flex-1 justify-between gap-1 px-1 relative z-20">
                    <div className={cn(!product.inStock && "opacity-50")}>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-medium">{product.category}</p>
                      <h3 className="text-[17px] font-serif text-slate-900 leading-tight line-clamp-2 mb-1">{product.name}</h3>
                    </div>
                    
                    {product.inStock ? (
                      <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-2 mt-3">
                        <span className="text-[16px] font-bold whitespace-nowrap text-slate-900">
                          {product.currency}{product.price.toLocaleString()}
                        </span>
                        
                        <div className="ml-auto">
                          {quantityInCart > 0 ? (
                            <div className="flex items-center bg-[#2c4c3b] rounded-full h-9 px-1 shadow-sm border border-[#2c4c3b] min-w-[90px] justify-between">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(product.id, quantityInCart - 1);
                                }}
                                className="w-8 h-full flex items-center justify-center text-white/90 hover:text-white transition-colors active:scale-90"
                              >
                                <Minus size={14} strokeWidth={2.5} />
                              </button>
                              <span className="text-[13px] font-bold text-white w-6 text-center tabular-nums leading-none pt-0.5">{quantityInCart}</span>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product);
                                }}
                                className="w-8 h-full flex items-center justify-center text-white/90 hover:text-white transition-colors active:scale-90"
                              >
                                <Plus size={14} strokeWidth={2.5} />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-transparent bg-[#f3f4f6] text-[#2c4c3b] hover:bg-[#e5e5e5] active:scale-95 hover:border-slate-200"
                            >
                              <Plus size={20} strokeWidth={2} />
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100 border-dashed">
                        <span className="text-sm font-medium text-slate-400 whitespace-nowrap">
                          {product.currency}{product.price.toLocaleString()}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-md whitespace-nowrap">
                          Unavailable
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatedPage>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
