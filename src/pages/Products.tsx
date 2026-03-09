import { useState } from "react";
import { motion } from "motion/react";
import { Search, Info, ChevronRight } from "lucide-react";
import { AnimatedPage } from "../components/AnimatedPage";
import { cn } from "../utils/cn";
import { useLanguage } from "../contexts/LanguageContext";
import { useProducts } from "../hooks/useProducts";

export function Products() {
  const { t, language } = useLanguage();
  const { products, isLoading } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamically generate categories from products
  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
  const categories = [
    { id: "All", label: t('store.all') || "All" },
    { id: t('products.categories.health'), label: t('products.categories.health') },
    { id: t('products.categories.beauty'), label: t('products.categories.beauty') },
    { id: t('products.categories.personal'), label: t('products.categories.personal') },
    { id: t('products.categories.household'), label: t('products.categories.household') },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatedPage className="space-y-8 pb-24">
      <div className="flex flex-col gap-3 px-2">
        <h1 className="text-[2.5rem] font-serif text-slate-900 tracking-tight leading-none">
          Catalog
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed max-w-[90%] font-light">
          Explore our comprehensive range of wellness and beauty products. Learn about their benefits, ingredients, and how they can improve your daily life.
        </p>
      </div>

      <div className="relative px-2">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200/60 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c2a67a]/30 shadow-sm transition-all"
        />
      </div>

      <div className="sticky top-0 z-20 bg-[#fcfcfc]/80 backdrop-blur-xl py-3 -mx-4 px-4 border-b border-slate-100/50">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-5 py-2 rounded-full text-[13px] whitespace-nowrap transition-all duration-300",
                activeCategory === cat.id
                  ? "bg-[#0a0f0d] text-white font-medium shadow-md"
                  : "bg-white text-slate-500 border border-slate-200/60 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-10 px-2">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group flex flex-col gap-5 will-change-transform"
          >
            <div className="relative h-[320px] rounded-[2rem] overflow-hidden bg-[#f8f6f0]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/80 backdrop-blur-md text-[#2c4c3b] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                  {product.element}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-[#0a0f0d]/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 px-1">
              <div>
                <h3 className="text-[1.75rem] font-serif text-slate-900 leading-tight mb-2">{product.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>
              
              <div className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 text-[#c2a67a] font-medium text-xs uppercase tracking-widest mb-4">
                  <Info size={14} />
                  <span>Key Benefits</span>
                </div>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <ChevronRight size={16} className="text-[#c2a67a] shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-light">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedPage>
  );
}
