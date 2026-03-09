import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useState, useEffect } from "react";
import { submitOrder } from "../services/orderService";
import { CheckoutForm } from "./CheckoutForm";
import { OrderSuccessOverlay } from "./OrderSuccessOverlay";
import { cn } from "../utils/cn";
import { useLanguage } from "../contexts/LanguageContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const [view, setView] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Reset view when drawer closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setView('cart');
        setOrderError(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handlePlaceOrder = async (userData: { name: string; phone: string; location: string }) => {
    setIsSubmitting(true);
    setOrderError(null);
    try {
      await submitOrder({
        items,
        total: totalPrice,
        userName: userData.name,
        userPhone: userData.phone,
        userLocation: userData.location,
      });
      setView('success');
      clearCart();
    } catch (error) {
      console.error("Order submission failed:", error);
      setOrderError(error instanceof Error ? error.message : "Failed to send order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#fcfcfc] shadow-2xl z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
              <h2 className="font-serif text-2xl text-slate-900 flex items-center gap-3">
                <ShoppingBag size={24} className="text-[#c2a67a]" strokeWidth={1.5} />
                {view === 'checkout' ? t('checkout.title') : t('cart.title')}
              </h2>
              <button 
                onClick={onClose} 
                className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 relative">
              <AnimatePresence mode="wait">
                {view === 'cart' ? (
                  <motion.div
                    key="cart-view"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    {items.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 py-20">
                        <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                          <ShoppingBag size={40} strokeWidth={1} className="text-slate-300" />
                        </div>
                        <p className="font-serif text-xl text-slate-900">{t('cart.empty')}</p>
                        <p className="text-sm font-light text-center">{t('cart.empty.desc')}</p>
                      </div>
                    ) : (
                      items.map(item => (
                        <div key={item.id} className="flex gap-4 bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm group">
                          <div className="w-24 h-24 rounded-[1rem] overflow-hidden bg-[#f8f6f0] shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                              referrerPolicy="no-referrer" 
                            />
                          </div>
                          <div className="flex flex-col justify-between flex-1 py-1">
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="text-sm font-serif text-slate-900 leading-tight line-clamp-2">{item.name}</h3>
                              <button 
                                onClick={() => removeFromCart(item.id)} 
                                className="text-slate-300 hover:text-red-500 transition-colors p-1 shrink-0"
                              >
                                <Trash2 size={18} strokeWidth={1.5} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <span className="font-bold text-[#0a0f0d]">
                                {item.currency}{(item.price * item.quantity).toLocaleString()}
                              </span>
                              <div className="flex items-center gap-4 bg-[#f8f6f0] rounded-full px-3 py-1.5">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                                  className="text-slate-400 hover:text-[#0a0f0d] transition-colors"
                                >
                                  <Minus size={14} strokeWidth={2} />
                                </button>
                                <span className="text-sm font-bold w-4 text-center text-[#0a0f0d]">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                                  className="text-slate-400 hover:text-[#0a0f0d] transition-colors"
                                >
                                  <Plus size={14} strokeWidth={2} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </motion.div>
                ) : view === 'checkout' ? (
                  <CheckoutForm 
                    onBack={() => setView('cart')}
                    onSubmit={handlePlaceOrder}
                    isSubmitting={isSubmitting}
                  />
                ) : null}
              </AnimatePresence>

              {orderError && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-6 py-3 mb-4 bg-red-50 border border-red-100 rounded-2xl mx-6"
                >
                  <p className="text-red-600 text-xs text-center">{orderError}</p>
                </motion.div>
              )}
            </div>

            {view === 'cart' && items.length > 0 && (
              <div className="p-6 bg-white border-t border-slate-100 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500 font-light">{t('cart.subtotal')}</span>
                  <span className="text-2xl font-serif text-slate-900">
                    {items[0]?.currency}{totalPrice.toLocaleString()}
                  </span>
                </div>
                <button 
                  onClick={() => setView('checkout')}
                  className="w-full bg-[#0a0f0d] text-white py-4 rounded-2xl font-medium shadow-xl hover:bg-[#2c4c3b] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {t('cart.checkout')}
                </button>
              </div>
            )}

            <AnimatePresence>
              {view === 'success' && (
                <OrderSuccessOverlay onClose={onClose} />
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
