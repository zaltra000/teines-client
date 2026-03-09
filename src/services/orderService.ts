import { ref, push, set, serverTimestamp } from "firebase/database";
import { db } from "../lib/firebase";
import { CartItem } from "../contexts/CartContext";

export interface OrderData {
  items: CartItem[];
  total: number;
  userName: string;
  userPhone: string;
  userLocation: string;
}

// Helper to recursively remove undefined values (Firebase doesn't allow them)
const sanitize = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(v => sanitize(v));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, sanitize(v)])
    );
  }
  return obj;
};

export const submitOrder = async (order: OrderData) => {
  try {
    const ordersRef = ref(db, 'orders');
    const newOrderRef = push(ordersRef);
    
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Submission timed out (10s). Please check your internet connection.")), 10000)
    );

    const sanitizedOrder = sanitize({
      ...order,
      status: 'pending',
      createdAt: serverTimestamp(),
    });

    // Race the set operation against the timeout
    await Promise.race([
      set(newOrderRef, sanitizedOrder),
      timeoutPromise
    ]);
    
    return { success: true, orderId: newOrderRef.key };
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
  }
};
