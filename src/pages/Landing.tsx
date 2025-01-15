import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { ArrowDown, CheckCircle } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-secondary/50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg"></div>
          <span className="text-xl font-semibold">My Second Opinion</span>
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <a href="#how-it-works" className="text-foreground/80 hover:text-foreground">How it works</a>
          <a href="#our-mission" className="text-foreground/80 hover:text-foreground">Our mission</a>
          <a href="#faq" className="text-foreground/80 hover:text-foreground">FAQ</a>
          <Button onClick={handleGetStarted} className="bg-[#2D2D2D] text-white hover:bg-[#2D2D2D]/90">
            Get started
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 text-center mt-20 mb-32">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-primary font-medium mb-6 tracking-wide">
            YOUR TRUSTED SECOND OPINION
          </h2>
          <h1 className="text-5xl md:text-6xl font-semibold mb-8 text-[#2D2D2D]">
            Get trusted advice when you need it most.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Get personalized, unbiased opinions on your important decisions and dilemmas.
          </p>

          {/* Features */}
          <div className="flex flex-col gap-4 items-center mb-12">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-primary h-5 w-5" />
              <span className="text-gray-600">AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-primary h-5 w-5" />
              <span className="text-gray-600">Unbiased Perspectives</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-primary h-5 w-5" />
              <span className="text-gray-600">Quick & Thoughtful Responses</span>
            </div>
          </div>

          {/* Get Started Form */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <Input 
              placeholder="What's on your mind?" 
              className="flex-1 text-lg h-12"
            />
            <Button 
              onClick={handleGetStarted}
              className="bg-[#2D2D2D] text-white hover:bg-[#2D2D2D]/90 h-12 px-8"
            >
              Get started for free
            </Button>
          </div>
        </div>

        {/* How it Works Section Indicator */}
        <div className="mt-32 flex flex-col items-center gap-4">
          <ArrowDown className="h-8 w-8 text-primary animate-bounce" />
          <h3 className="text-primary font-medium tracking-wide">
            HOW IT WORKS
          </h3>
        </div>
      </main>
    </div>
  );
};

export default Landing;