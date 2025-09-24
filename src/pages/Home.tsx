import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Utensils, MapPin } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/hero-food.jpg';

const Home = () => {
  const categories = [
    { name: "Pizza", image: "https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU=" },
    { name: "Burgers", image: "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg" },
    { name: "Pasta", image: "https://www.spicebangla.com/wp-content/uploads/2024/08/Spicy-Pasta-recipe-optimised-scaled.webp" },
    { name: "Salads", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1jilAOw-NbN6aV2xQ85h-zp9m2mqWO-3L3w&s" },
    { name: "Desserts", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKwS68mAEjbzKOkhTKYHK8Q1TiIFk3fy0jeg&s" },
    { name: "Beverages", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_bSTB8829zZMQpP6tAvWcGDKCPoNIvdDyxA&s" },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* 🔥 Moving Banner Section */}
      <div className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-lg font-semibold px-14">
          <span>🔥Free Delivery on All Orders Today!</span>
          <span>Flat 20% Student Discount Available</span>
          <span>Fresh Meals, Delivered to Your Dorm</span>
          <span>⚡ Order Now & Get ₹50 Cashback</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-pink-500/30 rounded-full filter blur-3xl animate-blob mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-purple-500/20 rounded-full filter blur-2xl animate-blob animation-delay-2000 mix-blend-multiply pointer-events-none"></div>

        <div className="container px-4 py-20 sm:py-28 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">

            {/* Text Content */}
            <div className="flex flex-col justify-center space-y-6 animate-fade-in-up">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl">
                  Delicious Food
                  <br />
                  <span className="text-accent-foreground/90">Delivered Fast</span>
                </h1>
                <p className="max-w-[650px] text-white/90 md:text-xl">
                  Order fresh, tasty meals directly to your dorm room or any campus location. Quick, easy, and perfect for busy students who want delicious food without any hassle. Explore a variety of options and enjoy meals at student-friendly prices.
                </p>
              </div>

              {/* Callout badges */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full font-medium text-sm backdrop-blur-sm">
                  Free Delivery
                </span>
                <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full font-medium text-sm backdrop-blur-sm">
                  Student Discount
                </span>
                <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full font-medium text-sm backdrop-blur-sm">
                  Fresh Ingredients
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 min-[400px]:flex-row mt-6">
                <Link
                  to="/menu"
                  className={cn(
                    buttonVariants({ variant: "hero", size: "lg" }),
                    "bg-white text-primary hover:bg-white/90 transition-transform duration-200 hover:scale-105"
                  )}
                >
                  Start Ordering
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/menu"
                  className={cn(
                    buttonVariants({ variant: "hero", size: "lg" }),
                    "bg-white text-primary hover:bg-white/90 transition-transform duration-200 hover:scale-105"
                  )}
                >
                  View Menu
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative animate-float">
              <div className="relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={heroImage}
                  alt="Fresh delicious food"
                  className="w-full h-[450px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/20">
        <div className="container px-4">
          <div className="text-center space-y-6 mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
              Why Choose CampusBite?
            </h2>
            <p className="max-w-[700px] mx-auto text-gray-600 dark:text-gray-300 md:text-lg">
              We make ordering food simple, fast, and convenient for students. Whether you're in your dorm, at the library, or between classes, our service brings delicious meals directly to you.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-4 lg:grid-cols-4">
            {/* Fast Delivery */}
            <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quick delivery straight to your dorm room within 30 minutes, so you never have to wait long for your favorite meals.
              </p>
            </div>

            {/* Fresh & Tasty */}
            <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow">
                <Utensils className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Fresh & Tasty</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All meals are prepared fresh daily using high-quality ingredients. Healthy, tasty, and satisfying food for your busy student life.
              </p>
            </div>

            {/* Dorm Delivery */}
            <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow">
                <MapPin className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Dorm Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Convenient delivery directly to your dorm, library, or any campus location. You focus on studying, we handle your meals.
              </p>
            </div>

            {/* Affordable Prices */}
            <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow">
                <span className="text-primary text-2xl font-bold">₹</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Affordable Prices</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enjoy tasty meals without breaking the bank. Special student discounts and meal combos make eating on campus easy and affordable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold sm:text-5xl text-gray-900 dark:text-white">
              Explore Our Categories
            </h2>
            <p className="max-w-[700px] mx-auto text-gray-600 dark:text-gray-300 md:text-lg">
              Choose from a variety of delicious meals. Tap on any category to explore more and place your order quickly.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * idx}s` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <Link
                    to="/menu"
                    className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition"
                  >
                    Explore More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container px-4 text-center">
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
              Ready to Order?
            </h2>
            <p className="max-w-[700px] mx-auto text-gray-600 dark:text-gray-300 md:text-lg">
              Browse our delicious menu and place your first order today! Whether you're studying late at the library, hanging out in your dorm, or rushing between classes, we make it easy to get fresh, tasty meals delivered straight to you. Enjoy a variety of options at student-friendly prices, all just a few clicks away.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
              <Link
                to="/menu"
                className={cn(
                  buttonVariants({ variant: "hero", size: "lg" }),
                  "transition-transform duration-200 hover:scale-105"
                )}
              >
                View Our Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/menu"
                className={cn(
                  buttonVariants({ variant: "hero", size: "lg" }),
                  "transition-transform duration-200 hover:scale-105"
                )}
              >
                Download App
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
