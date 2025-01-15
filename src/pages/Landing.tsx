import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";

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
    <div className="min-h-screen flex flex-col">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="currentColor"
                className="text-primary"
              />
              <circle
                cx="12"
                cy="12"
                r="4"
                fill="white"
                className="text-white"
              />
            </svg>
            <span className="text-xl font-medium text-gray-900">My Second Opinion</span>
          </div>
          <Button 
            onClick={handleGetStarted}
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border border-primary/20 text-primary hover:bg-primary/5"
          >
            Sign in
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Main Content */}
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 tracking-tight">
              Turn thoughts into
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> clarity</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Get thoughtful second opinions on your important decisions, powered by advanced AI and human wisdom.
            </p>

            {/* CTA Section */}
            <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto pt-8">
              <Input 
                placeholder="What's on your mind?" 
                className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 text-gray-900 placeholder:text-gray-500"
              />
              <Button 
                onClick={handleGetStarted}
                className="h-12 px-6 bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-32">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-primary/10 backdrop-blur-sm"
              >
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 My Second Opinion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: "AI-Powered Insights",
    description: "Get intelligent, nuanced perspectives on your decisions using advanced AI technology.",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Human Wisdom",
    description: "Combine AI insights with human experience for more balanced decision-making.",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    title: "Privacy First",
    description: "Your thoughts and decisions are protected with enterprise-grade security.",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  }
];

export default Landing;