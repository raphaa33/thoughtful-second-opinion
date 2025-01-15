import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Brain, MessageCircle, Shield, Sparkles } from "lucide-react";

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
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/90 to-primary rounded-xl grid place-items-center transform transition-all duration-300 group-hover:rotate-6 shadow-lg">
              <Brain className="w-6 h-6 text-primary-foreground transform transition-transform group-hover:scale-110" />
            </div>
            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Second Opinion
            </span>
            <span className="text-xs text-muted-foreground">AI-Powered Insights</span>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">How it works</a>
          <Button onClick={handleGetStarted} variant="outline">
            Get started
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
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
                <Button onClick={handleGetStarted} size="lg" className="gap-2">
                  Start for free <ArrowRight className="w-4 h-4" />
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
              className="max-w-sm text-base"
            />
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="gap-2"
            >
              Get started <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;