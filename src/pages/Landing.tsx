import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Brain, MessageCircle, Shield, Sparkles } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/50 to-background">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg grid place-items-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold">My Second Opinion</span>
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">How it works</a>
          <Button 
            onClick={handleGetStarted} 
            variant="outline"
            className="rounded-full border-primary/20 hover:bg-primary/5"
          >
            Get started
          </Button>
        </nav>
      </header>

      {/* Trusted Second Opinion Banner */}
      <div className="container mx-auto px-4 py-8">
        <img 
          src="/lovable-uploads/67c9fe1d-0904-4c8d-ae9a-e60dad044e37.png" 
          alt="Your Trusted Second Opinion" 
          className="max-w-3xl mx-auto w-full"
        />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-[85rem] mx-auto">
          <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
            <div className="lg:col-span-3 mx-auto text-center lg:text-left max-w-2xl">
              <h1 className="block text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl max-w-xl mx-auto lg:mx-0">
                Get trusted Advice when you need it most
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Get personalized, unbiased second opinions on your important decisions using advanced AI technology that considers multiple perspectives.
              </p>
              <div className="mt-8 grid gap-3 w-full sm:inline-flex">
                <Button 
                  onClick={handleGetStarted} 
                  size="lg" 
                  className="rounded-full text-lg font-medium bg-primary hover:bg-primary/90 text-white px-8"
                >
                  Get started for free
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:gap-x-8 justify-center lg:justify-start">
                <div className="flex items-center gap-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Secure & Private</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">24/7 Available</span>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="lg:col-span-4 mt-10 lg:mt-0">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "AI-Powered Analysis",
                    description: "Advanced algorithms analyze your situation from multiple angles",
                    icon: Brain
                  },
                  {
                    title: "Instant Insights",
                    description: "Get thoughtful responses within seconds",
                    icon: Sparkles
                  },
                  {
                    title: "Unbiased Perspective",
                    description: "Objective analysis free from emotional attachment",
                    icon: Shield
                  },
                  {
                    title: "Personalized Advice",
                    description: "Tailored recommendations based on your context",
                    icon: MessageCircle
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group relative bg-background/50 border rounded-xl p-5 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-x-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    </div>
                    <p className="mt-3 text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to make better decisions?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Input 
              placeholder="What's on your mind?" 
              className="max-w-sm text-base rounded-full"
            />
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="rounded-full text-lg font-medium bg-primary hover:bg-primary/90 text-white px-8"
            >
              Get started for free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;