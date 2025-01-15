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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg grid place-items-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold">My Second Opinion</span>
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
            <div className="lg:col-span-3">
              <h1 className="block text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                Make better decisions with AI-powered insights
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
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:gap-x-8">
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