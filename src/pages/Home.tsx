import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Utensils, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/hero-food.jpg';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
  {/* Background accents */}
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
          {/* Header */}
          <div className="text-center space-y-6 mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
              Why Choose BiteBuddy?
            </h2>
            <p className="max-w-[700px] mx-auto text-gray-600 dark:text-gray-300 md:text-lg">
              We make ordering food simple, fast, and convenient for students. Whether you're in your dorm, at the library, or between classes, our service brings delicious meals directly to you.
            </p>
          </div>

          {/* Features */}
          <div className="grid gap-12 md:grid-cols-4 lg:grid-cols-4">
            {/* Fast Delivery */}
            <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 shadow-lg animate-bounce-gentle">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quick delivery straight to your dorm room within 30 minutes, so you never have to wait long for your favorite meals.
              </p>
            </div>

            {/* Fresh & Tasty */}
            <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-green-400 via-yellow-400 to-orange-400 shadow-lg animate-bounce-gentle">
                <Utensils className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Fresh & Tasty</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All meals are prepared fresh daily using high-quality ingredients. Healthy, tasty, and satisfying food for your busy student life.
              </p>
            </div>

            {/* Dorm Delivery */}
            <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 via-teal-400 to-cyan-500 shadow-lg animate-bounce-gentle">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Dorm Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Convenient delivery directly to your dorm, library, or any campus location. You focus on studying, we handle your meals.
              </p>
            </div>

            {/* Affordable Prices */}
            <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500 shadow-lg animate-bounce-gentle">
                <span className="text-white text-2xl font-bold">₹</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Affordable Prices</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enjoy tasty meals without breaking the bank. Special student discounts and meal combos make eating on campus easy and affordable.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container px-4 text-center">
          {/* Header */}
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
              Ready to Order?
            </h2>
            <p className="max-w-[700px] mx-auto text-gray-600 dark:text-gray-300 md:text-lg">
              Browse our delicious menu and place your first order today! Whether you're studying late at the library, hanging out in your dorm, or rushing between classes, we make it easy to get fresh, tasty meals delivered straight to you. Enjoy a variety of options at student-friendly prices, all just a few clicks away.
            </p>

            {/* Buttons with space */}
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