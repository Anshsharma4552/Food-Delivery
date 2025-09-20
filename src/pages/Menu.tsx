import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart, MenuItem } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const menuItems: MenuItem[] = [
  // Mains
  { id: '1', name: 'Classic Burger', price: 8.99, category: 'Mains', description: 'Juicy beef patty with lettuce, tomato, and cheese' },
  { id: '2', name: 'Chicken Wrap', price: 7.49, category: 'Mains', description: 'Grilled chicken with fresh vegetables in a soft tortilla' },
  { id: '3', name: 'Veggie Pizza Slice', price: 4.99, category: 'Mains', description: 'Fresh vegetables on crispy pizza base with melted cheese' },
  { id: '4', name: 'Fish & Chips', price: 9.99, category: 'Mains', description: 'Crispy battered fish with golden fries' },
  
  // Salads
  { id: '5', name: 'Caesar Salad', price: 6.99, category: 'Salads', description: 'Fresh romaine lettuce with caesar dressing and croutons' },
  { id: '6', name: 'Greek Salad', price: 7.49, category: 'Salads', description: 'Mixed greens with feta cheese, olives, and tomatoes' },
  { id: '7', name: 'Quinoa Bowl', price: 8.49, category: 'Salads', description: 'Nutritious quinoa with roasted vegetables and tahini dressing' },
  
  // Snacks
  { id: '8', name: 'Nachos', price: 5.99, category: 'Snacks', description: 'Crispy tortilla chips with cheese sauce and jalapeños' },
  { id: '9', name: 'Chicken Wings', price: 7.99, category: 'Snacks', description: '6 pieces of spicy chicken wings with ranch dip' },
  { id: '10', name: 'Garlic Bread', price: 3.99, category: 'Snacks', description: 'Warm crusty bread with garlic butter and herbs' },
  
  // Drinks
  { id: '11', name: 'Fresh Orange Juice', price: 2.99, category: 'Drinks', description: 'Freshly squeezed orange juice' },
  { id: '12', name: 'Iced Coffee', price: 3.49, category: 'Drinks', description: 'Cold brew coffee with ice and your choice of milk' },
  { id: '13', name: 'Smoothie', price: 4.49, category: 'Drinks', description: 'Blend of fresh fruits and yogurt' },
];

const categories = ['All', 'Mains', 'Salads', 'Snacks', 'Drinks'];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { cart, addToCart, updateQuantity } = useCart();

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem?.quantity || 0;
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your order`,
    });
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Our Menu
          </h1>
          <p className="max-w-[600px] mx-auto text-muted-foreground md:text-lg">
            Fresh, delicious meals prepared daily for students
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "transition-all duration-300 hover:scale-105",
                selectedCategory === category && "bg-gradient-primary"
              )}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => {
            const quantity = getItemQuantity(item.id);
            return (
              <Card 
                key={item.id} 
                className="p-6 bg-gradient-card hover:shadow-card transition-all duration-300 hover:scale-105 animate-scale-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      ${item.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    {quantity > 0 ? (
                      <div className="flex items-center space-x-3 animate-scale-in">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, quantity - 1)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium animate-bounce-gentle">{quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, quantity + 1)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className={cn(buttonVariants({ variant: "menu" }))}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;