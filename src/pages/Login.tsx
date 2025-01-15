import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";
import { AuthError, AuthApiError } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const getErrorMessage = (error: AuthError) => {
    console.log("Auth error:", error);
    
    if (error instanceof AuthApiError) {
      switch (error.message) {
        case "Invalid login credentials":
          return "Invalid email or password. Please check your credentials and try again.";
        case "Email not confirmed":
          return "Please verify your email address before signing in.";
        default:
          return error.message;
      }
    }
    return error.message;
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (event === 'SIGNED_IN' && session) {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        navigate("/");
      }
      
      if (event === 'SIGNED_OUT') {
        setError(null);
      }

      // Handle authentication errors
      if (event === 'USER_UPDATED' && !session) {
        const { error } = await supabase.auth.getSession();
        if (error) {
          setError(getErrorMessage(error));
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-secondary/50">
      <div className="container mx-auto p-8 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Welcome Message */}
          <div className="hidden md:flex flex-col space-y-6 p-8">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-8 w-8" />
              <h1 className="text-4xl font-bold">We're Here to Help</h1>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Welcome Back!</h2>
              <p className="text-muted-foreground">
                Get instant, unbiased perspectives on your toughest decisions. 
                Join our community of thoughtful decision-makers.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h3 className="font-medium text-foreground">AI-Powered</h3>
                  <p className="text-sm text-muted-foreground">Advanced analysis for balanced insights</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h3 className="font-medium text-foreground">Quick & Easy</h3>
                  <p className="text-sm text-muted-foreground">Get thoughtful responses in seconds</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Auth Form */}
          <Card className="w-full shadow-lg">
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-2xl">Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Auth
                supabaseClient={supabase}
                appearance={{ 
                  theme: ThemeSupa,
                  style: {
                    button: { 
                      background: 'hsl(var(--primary))',
                      color: 'hsl(var(--primary-foreground))',
                      borderRadius: 'var(--radius)',
                    },
                    anchor: { color: 'hsl(var(--primary))' },
                    container: { gap: '1rem' },
                    divider: { margin: '1.5rem 0' },
                    input: {
                      borderRadius: 'var(--radius)',
                      padding: '0.75rem 1rem',
                    },
                    message: {
                      borderRadius: 'var(--radius)',
                      padding: '0.75rem 1rem',
                    },
                  }
                }}
                theme="light"
                providers={[]}
                redirectTo={window.location.origin}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;