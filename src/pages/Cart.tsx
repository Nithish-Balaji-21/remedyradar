
import { useState } from "react";
import { MinusCircle, PlusCircle, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/components/ui/use-toast";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [address, setAddress] = useState("");
  
  const handleIncreaseQuantity = (medicineId: string, currentQuantity: number) => {
    updateQuantity(medicineId, currentQuantity + 1);
  };
  
  const handleDecreaseQuantity = (medicineId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(medicineId, currentQuantity - 1);
    } else {
      removeItem(medicineId);
    }
  };
  
  const handleRemoveItem = (medicineId: string) => {
    removeItem(medicineId);
  };
  
  const handleCheckout = () => {
    if (!address.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter your delivery address.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would trigger a payment flow and order creation
    toast({
      title: "Order Placed!",
      description: "Your medicines will arrive within 30 minutes.",
    });
    
    clearCart();
    setAddress("");
  };
  
  // Function to format price in Indian Rupees
  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some medicines to get started.</p>
            <Button asChild>
              <a href="/medicines">Browse Medicines</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Cart Items</h2>
                  
                  <div className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <div key={item.medicine.id} className="py-4 flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md mr-4 mb-4 sm:mb-0 flex items-center justify-center">
                          <img
                            src={item.medicine.image}
                            alt={item.medicine.name}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.medicine.name}</h3>
                          <p className="text-sm text-gray-600">{item.medicine.dosage}</p>
                          <p className="font-medium text-medical-600 mt-1">
                            {formatPrice(item.medicine.price)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDecreaseQuantity(item.medicine.id, item.quantity)}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleIncreaseQuantity(item.medicine.id, item.quantity)}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 ml-2"
                            onClick={() => handleRemoveItem(item.medicine.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-4">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span>₹49.00</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(getTotalPrice() + 49.00)}</span>
                    </div>
                    
                    <div className="pt-4">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address
                      </label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your full address"
                        className="mb-4"
                      />
                      
                      <Button 
                        className="w-full" 
                        onClick={handleCheckout}
                      >
                        Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
