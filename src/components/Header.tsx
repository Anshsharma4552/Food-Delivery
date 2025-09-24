import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Home, Menu, FileText } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

const Header = () => {
  const location = useLocation();
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-hero">
            <span className="text-sm font-bold text-white">CB</span>
          </div>
          <span className="text-lg font-semibold">CampusBites</span>
        </Link>

        <nav className="flex items-center space-x-1">
          <Link
            to="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              isActive("/") && "bg-accent"
            )}
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Link>
          <Link
            to="/menu"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              isActive("/menu") && "bg-accent"
            )}
          >
            <Menu className="h-4 w-4 mr-2" />
            Menu
          </Link>
          <Link
            to="/order"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "relative",
              isActive("/order") && "bg-accent"
            )}
          >
            <FileText className="h-4 w-4 mr-2" />
            Order
            {cartItemsCount > 0 && (
              <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                {cartItemsCount}
              </div>
            )}
          </Link>
          <Link
            to="/admin"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              isActive("/admin") && "bg-accent"
            )}
          >
            Admin Panel
          </Link>
          <Link
            to="/login"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "relative",
              isActive("/login") && "bg-accent"
            )}
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;