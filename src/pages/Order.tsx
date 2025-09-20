import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Order = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.roomNumber.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and room number",
        variant: "destructive",
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before ordering",
        variant: "destructive",
      });
      return;
    }

    // Simulate order submission
    toast({
      title: "Order Placed! 🎉",
      description: `Thank you ${formData.name}! Your order will be delivered to room ${formData.roomNumber} within 30 minutes.`,
    });

    // Clear form and cart
    setFormData({ name: '', roomNumber: '' });
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container px-4 max-w-2xl mx-auto">
          <div className="text-center space-y-6 animate-fade-in-up">
            <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground animate-bounce-gentle" />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
              <p className="text-muted-foreground">
                Add some delicious items from our menu to get started!
              </p>
            </div>
            <Link
              to="/menu"
              className={cn(buttonVariants({ variant: "hero", size: "lg" }))}
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4 max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Your Order
          </h1>
          <p className="text-muted-foreground">
            Review your items and enter your details to complete your order
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Cart Items */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Cart Items</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                Clear All
              </Button>
            </div>

            <div className="space-y-4">
              {cart.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="p-4 animate-scale-in hover:shadow-card transition-all duration-300"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium min-w-[20px] text-center animate-bounce-gentle">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right min-w-[80px]">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive hover:scale-110 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-gradient-card">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-primary">${getCartTotal().toFixed(2)}</span>
              </div>
            </Card>
          </div>

          {/* Order Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Delivery Details</h2>
            
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="roomNumber">Room Number</Label>
                    <Input
                      id="roomNumber"
                      name="roomNumber"
                      type="text"
                      placeholder="e.g., Building A, Room 204"
                      value={formData.roomNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card">
                <div className="space-y-4">
                  <h3 className="font-semibold">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Items ({cart.reduce((total, item) => total + item.quantity, 0)}):</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-base">
                      <span>Total:</span>
                      <span className="text-primary">${getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className={cn(buttonVariants({ variant: "hero", size: "lg" }), "w-full")}
                  >
                    Place Order
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Expected delivery time: 25-30 minutes
                  </p>
                </div>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;