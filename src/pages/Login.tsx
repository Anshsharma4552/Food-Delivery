import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Phone, User, Lock, ArrowLeft, CheckCircle, Timer } from 'lucide-react';
// import { Link } from 'react-router-dom';
import { sendOtp, verifyOtp } from '@/lib/helper';

const Login = () => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();
  const otpRefs = useRef([]);

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && step === 'otp') {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, step]);

  const handlePhoneSubmit = async (e) => {
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
    
    try {
      await sendOtp(phoneNumber);
      setStep('otp');
      setCountdown(30); // 30 second countdown
      setCanResend(false);
      toast({
        title: "OTP Sent!",
        description: `Verification code sent to +91 ${phoneNumber}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await verifyOtp(phoneNumber, otpCode);
      toast({
        title: "Login Successful!",
        description: "Welcome back to BiteBuddy",
      });
      // Handle successful login (redirect, store token, etc.)
    } catch (error) {
      toast({
        title: "Invalid OTP",
        description: "The verification code is incorrect. Please try again.",
        variant: "destructive",
      });
      setOtp(['', '', '', '', '', '']); // Clear OTP inputs
      otpRefs.current[0]?.focus(); // Focus first input
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    
    setIsLoading(true);
    try {
      await sendOtp(phoneNumber);
      setCountdown(30);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']); // Clear previous OTP
      toast({
        title: "OTP Resent!",
        description: "A new verification code has been sent",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp(['', '', '', '', '', '']);
    setCountdown(0);
    setCanResend(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Logo/Brand Section */}
        <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2s' }}>
            {step === 'otp' ? (
              <CheckCircle className="w-8 h-8 text-primary-foreground" />
            ) : (
              <User className="w-8 h-8 text-primary-foreground" />
            )}
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            {step === 'phone' ? 'Welcome Back' : 'Verify Phone'}
          </h1>
          <p className="text-muted-foreground">
            {step === 'phone' 
              ? 'Sign in to continue your food journey'
              : `Enter the 6-digit code sent to +91 ${phoneNumber}`
            }
          </p>
        </div>

        {/* Login Form */}
        <Card className="backdrop-blur-sm bg-card/80 border-primary/20 shadow-xl animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-semibold text-foreground flex items-center justify-center gap-2">
              {step === 'otp' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToPhone}
                  className="absolute left-4 p-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              {step === 'phone' ? 'Sign In' : 'Enter OTP'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {step === 'phone' 
                ? 'Enter your phone number to get started'
                : 'We\'ve sent a verification code to your phone'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {step === 'phone' ? (
              <div className="space-y-6">
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
                  onClick={handlePhoneSubmit}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 animate-fade-in"
                  disabled={isLoading || phoneNumber.length < 10}
                  style={{ animationDelay: '0.4s' }}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending OTP...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Continue with Phone
                    </div>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <Label className="text-sm font-medium text-center block">
                    Enter Verification Code
                  </Label>
                  
                  {/* OTP Input Grid */}
                  <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value.replace(/[^0-9]/g, ''))}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-semibold border-primary/20 focus:border-primary transition-all duration-300"
                      />
                    ))}
                  </div>

                  {/* Countdown/Resend */}
                  <div className="text-center space-y-2">
                    {countdown > 0 ? (
                      <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                        <Timer className="w-4 h-4" />
                        Resend code in {countdown}s
                      </p>
                    ) : (
                      <Button
                        variant="link"
                        onClick={handleResendOtp}
                        disabled={!canResend || isLoading}
                        className="text-primary hover:text-primary-glow p-0"
                      >
                        Didn't receive code? Resend
                      </Button>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleOtpSubmit}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 animate-fade-in"
                  disabled={isLoading || otp.join('').length < 6}
                  style={{ animationDelay: '0.4s' }}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Verifying...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Verify & Continue
                    </div>
                  )}
                </Button>
              </div>
            )}

            {/* Additional Options - Only show on phone step */}
            {step === 'phone' && (
              <div className="mt-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-muted" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      New to BiteBuddy?
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full h-11 border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                  onClick={() => window.location.href = '/menu'}
                >
                  Browse Menu as Guest
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service
          </p>
          <span 
            className="text-sm text-primary hover:underline transition-colors cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            ← Back to Home
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;