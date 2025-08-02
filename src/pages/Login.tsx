import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Shield, University, Sparkles } from "lucide-react";
import { toast } from "sonner";
import universelogo from "@/assets/universe-logo.png";
import ivyHeroBg from "@/assets/ivy-hero-bg.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.endsWith('.edu')) {
      toast.error("Please use your .edu email address");
      return;
    }

    setIsLoading(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Verification email sent! Check your inbox.");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${ivyHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-ivy-organic" />
      
      {/* Content */}
      <div className="relative z-10 mobile-container mobile-safe-area min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center pt-16 pb-8">
          <div className="flex items-center justify-center mb-6">
            <img 
              src={universelogo} 
              alt="UniVerse" 
              className="w-20 h-20 ivy-float"
            />
          </div>
          <h1 className="font-display text-mobile-3xl font-bold text-foreground mb-2">
            Welcome to <span className="ivy-gradient bg-clip-text text-transparent">UniVerse</span>
          </h1>
          <p className="text-mobile-base text-muted-foreground font-medium">
            Spontaneous connections exclusively for college students
          </p>
        </div>

        {/* Login Card */}
        <div className="flex-1 flex items-center justify-center pb-16">
          <Card className="w-full organic-card backdrop-blur-sm bg-card/95">
            <CardHeader className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-6 h-6 text-primary" />
                <Sparkles className="w-4 h-4 text-accent animate-bounce-subtle" />
              </div>
              <CardTitle className="font-display text-mobile-xl">
                Verify Your Student Status
              </CardTitle>
              <CardDescription className="text-mobile-sm">
                We only accept verified college students to maintain our exclusive, trusted community
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-mobile-sm font-medium text-foreground">
                    University Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.name@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 text-mobile-base organic-button"
                      required
                    />
                  </div>
                  <p className="text-mobile-xs text-muted-foreground">
                    Must be a valid .edu email address
                  </p>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-12 ivy-gradient organic-button font-semibold text-mobile-base ivy-transition hover:ivy-glow"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <University className="w-5 h-5" />
                      <span>Send Verification</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/60" />
                  </div>
                  <div className="relative flex justify-center text-mobile-xs">
                    <span className="bg-card px-4 text-muted-foreground">or</span>
                  </div>
                </div>

                <Link to="/verification">
                  <Button variant="outline" className="w-full h-12 organic-button ivy-transition">
                    <Shield className="w-5 h-5 mr-2" />
                    Manual Verification
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="bg-ivy-sage/30 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-mobile-sm text-foreground">
                  🔒 Your Privacy & Safety
                </h4>
                <ul className="text-mobile-xs text-muted-foreground space-y-1">
                  <li>• AI-powered content moderation</li>
                  <li>• Verified students only</li>
                  <li>• Anonymous option available</li>
                  <li>• Report & block features</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center pb-4">
          <p className="text-mobile-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;