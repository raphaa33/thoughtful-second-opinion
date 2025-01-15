import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { OpinionsProvider } from "@/contexts/OpinionsContext"
import Landing from "./pages/Landing"
import Index from "./pages/Index"
import PreviousOpinions from "./pages/PreviousOpinions"
import AskFriend from "./pages/AskFriend"
import PopularQuestions from "./pages/PopularQuestions"
import SavedOpinions from "./pages/SavedOpinions"
import Settings from "./pages/Settings"
import Login from "./pages/Login"
import Account from "./pages/Account"
import { useEffect, useState } from "react"
import { supabase } from "./integrations/supabase/client"

const queryClient = new QueryClient()

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? (
    <div className="flex min-h-screen w-full bg-gray-50">
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OpinionsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <Routes>
              <Route path="/landing" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Index />
                  </PrivateRoute>
                }
              />
              <Route
                path="/previous-opinions"
                element={
                  <PrivateRoute>
                    <PreviousOpinions />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ask-friend"
                element={
                  <PrivateRoute>
                    <AskFriend />
                  </PrivateRoute>
                }
              />
              <Route
                path="/popular"
                element={
                  <PrivateRoute>
                    <PopularQuestions />
                  </PrivateRoute>
                }
              />
              <Route
                path="/saved"
                element={
                  <PrivateRoute>
                    <SavedOpinions />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <PrivateRoute>
                    <Account />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/landing" replace />} />
            </Routes>
          </SidebarProvider>
        </BrowserRouter>
      </OpinionsProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App