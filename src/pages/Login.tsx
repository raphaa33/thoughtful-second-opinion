import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a subscription intent in the URL
    const params = new URLSearchParams(location.search);
    const hasSubscriptionIntent = params.get('subscribe') === 'true';
    if (hasSubscriptionIntent) {
      localStorage.setItem('subscriptionIntent', 'true');
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        
        // Check if there was a subscription intent
        const subscriptionIntent = localStorage.getItem('subscriptionIntent');
        if (subscriptionIntent) {
          localStorage.removeItem('subscriptionIntent');
          // Redirect to landing page which will handle the subscription
          navigate('/landing');
        } else {
          navigate("/");
        }
      }
      if (event === 'SIGNED_OUT') {
        setError(null);
      }
      if (event === 'USER_UPDATED' && !session) {
        setError("Authentication failed. Please try again.");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.search, toast]);

  return (
    <div className="container mx-auto p-8 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back!</CardTitle>
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
                button: { background: 'rgb(59 130 246)', color: 'white' },
                anchor: { color: 'rgb(59 130 246)' },
              }
            }}
            theme="light"
            providers={[]}
            redirectTo={window.location.origin}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;