import { useState, useEffect } from 'react';
import { subscribeToStoreProducts, StoreProduct } from '../services/storeService';
import { useLanguage } from '../contexts/LanguageContext';

export function useProducts() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const unsubscribe = subscribeToStoreProducts(language, (data) => {
      setProducts(data);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [language]);

  return { products, isLoading, error };
}
