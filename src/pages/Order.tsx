import { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, Repeat, Eye } from 'lucide-react';
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

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  name: string;
  roomNumber: string;
  tip: number;
  items: OrderItem[];
  date: string;
}

const Order = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, addToCart } = useCart();
  const [formData, setFormData] = useState({ name: '', roomNumber: '', tip: 0 });
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'payNow'>('cod');
  const [lastOrder, setLastOrder] = useState<OrderData | null>(null);
  const [showLastOrderModal, setShowLastOrderModal] = useState(false);

  // Load last order from localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) setLastOrder(JSON.parse(savedOrder));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.roomNumber.trim()) {
      toast({ title: "Missing Information", description: "Please fill in your name and room number", variant: "destructive" });
      return;
    }

    if (cart.length === 0) {
      toast({ title: "Empty Cart", description: "Please add items to your cart before ordering", variant: "destructive" });
      return;
    }

    const totalAmount = getCartTotal() + Number(formData.tip);

    // Simulate payment process
    if (paymentMethod === 'payNow') {
      toast({ title: "Payment Successful 💳", description: `₹${totalAmount.toFixed(2)} has been paid successfully. Your order will be delivered to room ${formData.roomNumber} within 30 minutes.` });
    } else {
      toast({ title: "Order Placed! 🛵", description: `Please pay ₹${totalAmount.toFixed(2)} on delivery. Your order will be delivered to room ${formData.roomNumber} within 30 minutes.` });
    }

    // Save order to localStorage with timestamp
    const orderToSave: OrderData = { ...formData, items: cart, date: new Date().toISOString() };
    localStorage.setItem('lastOrder', JSON.stringify(orderToSave));
    setLastOrder(orderToSave);

    // Clear form and cart
    setFormData({ name: '', roomNumber: '', tip: 0 });
    clearCart();
  };

  const handleRepeatOrder = () => {
    if (lastOrder) {
      lastOrder.items.forEach(item => addToCart({ ...item, quantity: item.quantity }));
      setFormData({ name: lastOrder.name, roomNumber: lastOrder.roomNumber, tip: lastOrder.tip });
      toast({ title: "Order Loaded", description: "Your last order has been loaded into the cart." });
    }
  };

  if (cart.length === 0 && !lastOrder) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container px-4 max-w-2xl mx-auto text-center space-y-6 animate-fade-in-up">
          <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground animate-bounce-gentle" />
          <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
          <p className="text-muted-foreground">Add some delicious items from our menu to get started!</p>
          <Link to="/menu" className={cn(buttonVariants({ variant: "hero", size: "lg" }))}>Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4 max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Your Order</h1>
          <p className="text-muted-foreground">Review your items and enter your details to complete your order</p>
        </div>

        {/* Last Order Button */}
        {lastOrder && (
          <div className="text-center mb-6 animate-fade-in-up flex justify-center gap-4">
            <Button variant="outline" size="lg" onClick={() => setShowLastOrderModal(true)} className="flex items-center gap-2">
              <Eye className="h-5 w-5" /> Show Last Order
            </Button>
            <Button variant="outline" size="lg" onClick={handleRepeatOrder} className="flex items-center gap-2">
              <Repeat className="h-5 w-5" /> Repeat Last Order
            </Button>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Cart Items */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Cart Items</h2>
              <Button variant="outline" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive">Clear All</Button>
            </div>

            <div className="space-y-4">
              {cart.map((item, index) => (
                <Card key={item.id} className="p-4 animate-scale-in hover:shadow-card transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:scale-110 transition-transform">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium min-w-[20px] text-center animate-bounce-gentle">{item.quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:scale-110 transition-transform">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive hover:scale-110 transition-all">
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
                <span className="text-2xl font-bold text-primary">₹{getCartTotal().toFixed(2)}</span>
              </div>
            </Card>
          </div>

          {/* Order Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Delivery Details & Payment</h2>
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" type="text" placeholder="Enter your full name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roomNumber">Room Number</Label>
                    <Input id="roomNumber" name="roomNumber" type="text" placeholder="e.g., Building A, Room 204" value={formData.roomNumber} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tip">Tip for Delivery (Optional)</Label>
                    <Input id="tip" name="tip" type="number" min={0} placeholder="₹0" value={formData.tip} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <div className="flex gap-4">
                      <Button variant={paymentMethod === 'cod' ? 'default' : 'outline'} onClick={() => setPaymentMethod('cod')} className="flex-1">Cash on Delivery</Button>
                      <Button variant={paymentMethod === 'payNow' ? 'default' : 'outline'} onClick={() => setPaymentMethod('payNow')} className="flex-1 flex items-center justify-center gap-2">
                        <CreditCard className="h-4 w-4" /> Pay Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card">
                <div className="space-y-4">
                  <h3 className="font-semibold">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Items ({cart.reduce((total, item) => total + item.quantity, 0)}):</span>
                      <span>₹{getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tip:</span>
                      <span>₹{Number(formData.tip).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-base">
                      <span>Total:</span>
                      <span className="text-primary">₹{(getCartTotal() + Number(formData.tip)).toFixed(2)}</span>
                    </div>
                  </div>
                  <Button type="submit" className={cn(buttonVariants({ variant: "hero", size: "lg" }), "w-full")}>Place Order</Button>
                  <p className="text-xs text-muted-foreground text-center">Expected delivery time: 25-30 minutes</p>
                </div>
              </Card>
            </form>
          </div>
        </div>

        {/* Last Order Modal */}
        {showLastOrderModal && lastOrder && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <Card className="p-6 w-full max-w-lg relative">
              <button onClick={() => setShowLastOrderModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold">✕</button>
              <h2 className="text-2xl font-bold mb-4">Last Order</h2>
              <p><strong>Name:</strong> {lastOrder.name}</p>
              <p><strong>Room:</strong> {lastOrder.roomNumber}</p>
              <p><strong>Date:</strong> {new Date(lastOrder.date).toLocaleString()}</p>
              <div className="mt-4">
                <h3 className="font-semibold">Items:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {lastOrder.items.map(item => (
                    <li key={item.id}>{item.name} x {item.quantity} - ₹{(item.price * item.quantity).toFixed(2)}</li>
                  ))}
                </ul>
              </div>
              <Separator className="my-4" />
              <p className="font-semibold text-lg">Tip: ₹{lastOrder.tip.toFixed(2)}</p>
              <p className="font-bold text-xl mt-2">Total: ₹{(lastOrder.items.reduce((sum, i) => sum + i.price * i.quantity, 0) + lastOrder.tip).toFixed(2)}</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
