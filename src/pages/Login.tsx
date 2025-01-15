import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/", { replace: true });
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (event === 'SIGNED_IN' && session) {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        navigate("/", { replace: true });
      }
      
      if (event === 'SIGNED_OUT') {
        setError(null);
      }

      // Handle specific error cases
      if (event === 'USER_UPDATED' && !session) {
        const errorData = JSON.parse(localStorage.getItem('supabase.auth.error') || '{}');
        if (errorData.code === 'weak_password') {
          setError("Password should be at least 6 characters long.");
        } else if (errorData.code === 'validation_failed') {
          setError("Please enter both email and password.");
        } else if (errorData.code === 'invalid_credentials') {
          setError("Invalid login credentials. Please check your email and password.");
        } else {
          setError("Authentication failed. Please try again.");
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

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
                input: { background: 'white' },
                message: { color: 'rgb(239 68 68)' },
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