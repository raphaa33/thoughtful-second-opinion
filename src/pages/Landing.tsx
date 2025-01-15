import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { ArrowDown, CheckCircle, Menu } from "lucide-react";

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
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">SO</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">My Second Opinion</span>
          </div>
          
          <button className="md:hidden p-2">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>

          <nav className="hidden md:flex gap-8 items-center">
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it works</a>
            <a href="#our-mission" className="text-gray-600 hover:text-gray-900 transition-colors">Our mission</a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</a>
            <Button 
              onClick={handleGetStarted} 
              className="bg-primary hover:bg-primary/90 text-white font-medium"
            >
              Get started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24 pb-20 px-4 md:pt-32 md:pb-32">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <h2 className="inline-block text-primary font-medium mb-6 tracking-wide uppercase text-sm md:text-base bg-primary/10 px-4 py-2 rounded-full">
                Your Trusted Second Opinion
              </h2>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight text-center">
              Get trusted advice when you need it most.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed text-center">
              Get personalized, unbiased opinions on your important decisions and dilemmas.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-6 items-center justify-center mb-12">
              <div className="flex items-center gap-3 bg-white/50 px-6 py-3 rounded-full">
                <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
                <span className="text-gray-700">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-3 bg-white/50 px-6 py-3 rounded-full">
                <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
                <span className="text-gray-700">Unbiased Perspectives</span>
              </div>
              <div className="flex items-center gap-3 bg-white/50 px-6 py-3 rounded-full">
                <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
                <span className="text-gray-700">Quick & Thoughtful Responses</span>
              </div>
            </div>

            {/* Get Started Form */}
            <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <Input 
                  placeholder="What's on your mind?" 
                  className="flex-1 text-lg h-12 border-gray-200"
                />
                <Button 
                  onClick={handleGetStarted}
                  className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-medium"
                >
                  Get started for free
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works Section Indicator */}
        <div className="mt-32 flex flex-col items-center gap-4">
          <ArrowDown className="h-8 w-8 text-primary animate-bounce" />
          <h3 className="text-primary font-medium tracking-wide uppercase text-sm">
            How it Works
          </h3>
        </div>
      </main>
    </div>
  );
};

export default Landing;