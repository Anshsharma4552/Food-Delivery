import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Phone, User, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful!",
        description: "Welcome back to FoodieExpress",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Logo/Brand Section */}
        <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2s' }}>
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to continue your food journey
          </p>
        </div>

        {/* Login Form */}
        <Card className="backdrop-blur-sm bg-card/80 border-primary/20 shadow-xl animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-semibold text-foreground">
              Sign In
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your phone number to get started
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Number
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    className="pl-12 h-12 text-base border-primary/20 focus:border-primary transition-all duration-300"
                    maxLength={10}
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
                {phoneNumber && (
                  <p className="text-xs text-muted-foreground animate-fade-in">
                    We'll send you a verification code
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 animate-fade-in"
                disabled={isLoading || phoneNumber.length < 10}
                style={{ animationDelay: '0.4s' }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Continue with Phone
                  </div>
                )}
              </Button>
            </form>

            {/* Additional Options */}
            <div className="mt-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    New to FoodieExpress?
                  </span>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full h-11 border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                asChild
              >
                <Link to="/menu">
                  Browse Menu as Guest
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service
          </p>
          <Link to="/" className="text-sm text-primary hover:underline transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;