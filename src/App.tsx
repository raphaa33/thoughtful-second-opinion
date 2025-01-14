import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { OpinionsProvider } from "@/contexts/OpinionsContext"
import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import Index from "./pages/Index"
import Auth from "./pages/Auth"
import PreviousOpinions from "./pages/PreviousOpinions"
import AskFriend from "./pages/AskFriend"
import PopularQuestions from "./pages/PopularQuestions"
import SavedOpinions from "./pages/SavedOpinions"
import Settings from "./pages/Settings"

const queryClient = new QueryClient()

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OpinionsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gray-50">
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <AppSidebar />
                      <SidebarInset>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/previous-opinions" element={<PreviousOpinions />} />
                          <Route path="/ask-friend" element={<AskFriend />} />
                          <Route path="/popular" element={<PopularQuestions />} />
                          <Route path="/saved" element={<SavedOpinions />} />
                          <Route path="/settings" element={<Settings />} />
                        </Routes>
                      </SidebarInset>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </OpinionsProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App