
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";

export type Medicine = {
  id: string;
  name: string;
  description: string;
  price: number; // Price in INR
  image: string;
  dosage: string;
  category: string;
};

type CartItem = {
  medicine: Medicine;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (medicine: Medicine) => void;
  removeItem: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  formatPrice: (price: number) => string; // Added formatPrice utility function
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Utility function to format price in Indian Rupees
export const formatIndianPrice = (price: number): string => {
  return `₹${price.toFixed(2)}`;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (medicine: Medicine) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.medicine.id === medicine.id);
      
      if (exists) {
        return prev.map((item) => 
          item.medicine.id === medicine.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, { medicine, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${medicine.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const removeItem = (medicineId: string) => {
    setItems((prev) => prev.filter((item) => item.medicine.id !== medicineId));
  };

  const updateQuantity = (medicineId: string, quantity: number) => {
    if (quantity < 1) {
      return removeItem(medicineId);
    }
    
    setItems((prev) => 
      prev.map((item) => 
        item.medicine.id === medicineId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.medicine.price * item.quantity), 0);
  };

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return formatIndianPrice(price);
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity,
        clearCart,
        getTotalPrice,
        formatPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  
  return context;
};
