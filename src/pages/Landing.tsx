import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Users, Globe } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50/50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">WH</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">We're Here to Help</span>
          </div>
          
          <Button 
            onClick={handleGetStarted}
            variant="ghost"
            className="text-gray-600 hover:text-gray-900"
          >
            Sign in
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Get Support When You Need It Most
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Share your thoughts and receive thoughtful, personalized guidance to help you make better decisions.
          </p>

          {/* CTA Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-16 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <Input 
                placeholder="What's on your mind?" 
                className="flex-1 text-lg h-12"
              />
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="bg-primary hover:bg-primary/90 h-12"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Caring Support</h3>
              <p className="text-gray-600">
                Receive compassionate guidance from our supportive community
              </p>
            </div>

            <div className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Advice</h3>
              <p className="text-gray-600">
                Connect with experienced advisors who understand your needs
              </p>
            </div>

            <div className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Community</h3>
              <p className="text-gray-600">
                Join a worldwide network of supportive individuals
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;