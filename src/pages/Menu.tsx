import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart, MenuItem } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

// ✅ Updated menu items with veg/non-veg & eggless field for cakes
const menuItems: (MenuItem & { veg: boolean; image: string; eggless?: boolean })[] = [
  // Mains
  { id: '1', name: 'Classic Burger', price: 199, category: 'Mains', description: 'Juicy beef patty with lettuce, tomato, and cheese', image: 'https://www.unileverfoodsolutions.com.sg/dam/global-ufs/mcos/SEA/calcmenu/recipes/SG-recipes/vegetables-&-vegetable-dishes/%E7%BB%8F%E5%85%B8%E8%8A%9D%E5%A3%AB%E6%B1%89%E5%A0%A1/main-header.jpg', veg: false },
  { id: '2', name: 'Chicken Wrap', price: 179, category: 'Mains', description: 'Grilled chicken with fresh vegetables in a soft tortilla', image: 'https://www.awesomecuisine.com/wp-content/uploads/2013/07/Grilled-Chicken-Wrap.jpg', veg: false },
  { id: '3', name: 'Veggie Pizza Slice', price: 149, category: 'Mains', description: 'Fresh vegetables on crispy pizza base with melted cheese', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaOd-yzw835koYdEr8v0ecT5lvreJgMrz76g&s', veg: true },
  
  // Snacks
  { id: '9', name: 'Chicken Wings', price: 179, category: 'Snacks', description: '6 pieces of spicy chicken wings with ranch dip', image: 'https://www.recipetineats.com/tachyon/2024/11/New-Oreleans-chicken-wings_1.jpg?resize=500%2C500', veg: false },
  { id: '10', name: 'Garlic Bread', price: 99, category: 'Snacks', description: 'Warm crusty bread with garlic butter and herbs', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3N0Yq7z-ZBBumwhqUdr_gTw6SVAJxc64oxA&s', veg: true },
  { id: '11', name: 'Chips', price: 30, category: 'Snacks', description: 'Crunchy potato chips packet', image: 'https://www.2foodtrippers.com/wp-content/uploads/2023/02/American-Chip-Bags.jpg', veg: true },
  { id: '12', name: 'Biscuit', price: 25, category: 'Snacks', description: 'Fresh crunchy biscuits pack', image: 'https://c8.alamy.com/comp/R8K5D7/india-state-of-kerala-kozhikode-or-calicut-packets-of-biscuits-in-a-grocery-store-R8K5D7.jpg', veg: true },
  { id: '13', name: 'Maggi Noodles', price: 59, category: 'Snacks', description: '2-minute instant noodles hot & tasty', image: 'https://m.media-amazon.com/images/I/71Y7pDHbi8L.jpg', veg: true },
  { id: '18', name: 'Cold Drink', price: 49, category: 'Snacks', description: 'Chilled fizzy beverage (Coke/Pepsi)', image: 'https://5.imimg.com/data5/SELLER/Default/2023/6/315960216/OL/KS/EX/39752127/whatsapp-image-2023-06-12-at-18-37-36.jpeg', veg: true },
  // Salads 🥗
  { id: '20', name: 'Caesar Salad', price: 159, category: 'Salads', description: 'Romaine lettuce with Caesar dressing & croutons', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV5Yp0uPt-uqJ5udVjAL71-ArAIvCzE84nYQ&s', veg: true },
  { id: '21', name: 'Greek Salad', price: 179, category: 'Salads', description: 'Mixed greens with feta, olives & tomatoes', image: 'https://hips.hearstapps.com/hmg-prod/images/greek-salad-index-642f292397bbf.jpg', veg: true },
  { id: '22', name: 'Quinoa Bowl', price: 199, category: 'Salads', description: 'Nutritious quinoa with roasted vegetables & tahini', image: 'https://images.themodernproper.com/production/posts/2020/QuinoaBowl_4.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1737605526&s=b91b6baac05eb76bd048a76d12f4a9cd', veg: true },
  { id: '23', name: 'Paneer Tikka Salad', price: 189, category: 'Salads', description: 'Grilled paneer cubes with fresh salad mix', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWzEdnQ9IyOj0WUW4KQptNrQcCLdR3ndHcuQ&s', veg: true },
  { id: '24', name: 'Chicken Caesar Salad', price: 209, category: 'Salads', description: 'Caesar salad with grilled chicken strips', image: 'https://healthyfitnessmeals.com/wp-content/uploads/2020/05/instagram-In-Stream_Square___Low-carb-Caesar-salad-4.jpg', veg: false },

  // Cakes 🎂 (with eggless info)
  { id: '14', name: 'Chocolate Truffle Cake', price: 599, category: 'Cakes', description: 'Rich chocolate layered cake topped with ganache', image: 'https://static.toiimg.com/thumb/75758092.cms?width=1200&height=900', veg: true, eggless: false },
  { id: '15', name: 'Red Velvet Cake', price: 649, category: 'Cakes', description: 'Soft red velvet sponge with cream cheese frosting', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZkTmpMICYfHBrVchOLExy2oizgEJYktKYNg&s', veg: true, eggless: true },
  { id: '16', name: 'Black Forest Cake', price: 549, category: 'Cakes', description: 'Classic black forest with cherries & whipped cream', image: 'https://www.fnp.com/images/pr/l/v20250612185111/black-forest-cake_1.jpg', veg: true, eggless: false },
  { id: '17', name: 'Fruit Delight Cake', price: 699, category: 'Cakes', description: 'Vanilla sponge topped with fresh fruits & cream', image: 'https://www.woofern.com/public/uploads/all/q5dTSxyGip3SYQz2nYoIElUOHLiqxgfYh6XyDITg.png', veg: true, eggless: true },
];

// ✅ Categories with Cakes and Salads
const categories = [
  { name: 'All', image: 'https://thumbs.dreamstime.com/b/junk-food-concept-unhealthy-food-background-fast-food-sugar-burger-sweets-chips-chocolate-donuts-soda-junk-food-concept-137097176.jpg' },
  { name: 'Mains', image: 'https://images.picxy.com/cache/2020/7/11/a3f877f20da02b1a9b619ed4a82a065e.jpg' },
  { name: 'Snacks', image: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2Fshutterstock_2304757481' },
  { name: 'Salads', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGXiwLkwCqfrhpPbu3l44WTk5SbQQEYJeniQ&s' },
  { name: 'Cakes', image: 'https://flouringkitchen.com/wp-content/uploads/2023/07/BW1A4089-2.jpg' },
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [egglessOnly, setEgglessOnly] = useState(false);
  const { cart, addToCart, updateQuantity } = useCart();

  // ✅ Filter items by category, veg, and eggless (for cakes only)
  const filteredItems = menuItems.filter(item => {
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchVeg = selectedCategory !== 'Cakes' ? (!vegOnly || item.veg) : true;
    const matchEggless = selectedCategory === 'Cakes' ? (!egglessOnly || item.eggless) : true;
    return matchCategory && matchVeg && matchEggless;
  });

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem?.quantity || 0;
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    toast({ title: "Added to cart", description: `${item.name} has been added to your order` });
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4">
        
        {/* ✅ Restaurant Name */}
        <div className="text-center space-y-4 mb-6">
          <h1 className="text-5xl font-extrabold tracking-tight">🍴 Campus Bites</h1>
          <p className="max-w-[600px] mx-auto text-muted-foreground md:text-lg">
            Fresh, delicious meals prepared daily for students
          </p>
        </div>

        {/* ✅ Switches */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {selectedCategory === 'Cakes' ? (
            <>
              <span className="text-sm font-medium">Show Eggless Only</span>
              <Switch checked={egglessOnly} onCheckedChange={setEgglessOnly} />
            </>
          ) : (
            <>
              <span className="text-sm font-medium">Show Veg Only</span>
              <Switch checked={vegOnly} onCheckedChange={setVegOnly} />
            </>
          )}
        </div>

        {/* ✅ Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map(cat => (
            <div key={cat.name} className="flex flex-col items-center">
              <Button
                variant={selectedCategory === cat.name ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.name)}
                className={cn("w-28 h-28 rounded-full bg-cover bg-center text-white font-bold")}
                style={{ backgroundImage: `url(${cat.image})` }}
              >
                <span className="bg-black/50 px-2 py-1 rounded">{cat.name}</span>
              </Button>
            </div>
          ))}
        </div>

        {/* ✅ Menu Items Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map(item => {
            const quantity = getItemQuantity(item.id);
            return (
              <Card key={item.id} className="p-4 bg-gradient-card hover:shadow-card transition-all duration-300">
                <div className="space-y-3">
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-xl" />
                  <div className="flex items-center gap-2">
                    {item.category === 'Cakes' ? (
                      <span className={cn("w-3 h-3 rounded-full", item.eggless ? "bg-green-600" : "bg-yellow-600")} />
                    ) : (
                      <span className={cn("w-3 h-3 rounded-full", item.veg ? "bg-green-600" : "bg-red-600")} />
                    )}
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">₹{item.price.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{item.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    {quantity > 0 ? (
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.id, quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium">{quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.id, quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => handleAddToCart(item)} className={cn(buttonVariants({ variant: "menu" }))}>
                        <Plus className="h-4 w-4 mr-2" /> Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
