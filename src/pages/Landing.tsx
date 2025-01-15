import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Rocket, CheckCircle, ArrowRight } from "lucide-react";

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
              <span className="text-white font-bold text-xl">WH</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">We're Here to Help</span>
          </div>
          
          <nav className="hidden md:flex gap-8 items-center">
            <Button 
              variant="ghost"
              onClick={handleGetStarted}
              className="text-gray-600 hover:text-gray-900"
            >
              Sign in
            </Button>
            <Button 
              onClick={handleGetStarted}
              className="bg-primary hover:bg-primary/90"
            >
              Get started
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-4xl mx-auto text-center pt-20">
          {/* Hero Section */}
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
              Get trusted advice when you need it most
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Share your thoughts and get personalized, unbiased opinions to help you make better decisions.
            </p>
          </div>

          {/* Main CTA Form */}
          <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg mb-12">
            <div className="flex gap-4">
              <Input 
                placeholder="What's on your mind?" 
                className="flex-1 text-lg h-12 border-gray-200"
              />
              <Button 
                onClick={handleGetStarted}
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-medium whitespace-nowrap flex items-center gap-2"
              >
                Get started for free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-4 p-6 bg-white/50 rounded-2xl">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Quick Responses</h3>
              <p className="text-gray-600 text-center">
                Get thoughtful answers to your questions within minutes
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 bg-white/50 rounded-2xl">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Unbiased Advice</h3>
              <p className="text-gray-600 text-center">
                Receive balanced perspectives to help you make informed decisions
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 bg-white/50 rounded-2xl">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Private & Secure</h3>
              <p className="text-gray-600 text-center">
                Your conversations are always private and protected
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;