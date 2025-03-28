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

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </div>
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
              <Route path="/landing" element={<Navigate to="/" replace />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <Index />
                  </PublicRoute>
                }
              />
              <Route
                path="/previous-opinions"
                element={
                  <PublicRoute>
                    <PreviousOpinions />
                  </PublicRoute>
                }
              />
              <Route
                path="/ask-friend"
                element={
                  <PublicRoute>
                    <AskFriend />
                  </PublicRoute>
                }
              />
              <Route
                path="/popular"
                element={
                  <PublicRoute>
                    <PopularQuestions />
                  </PublicRoute>
                }
              />
              <Route
                path="/saved"
                element={
                  <PublicRoute>
                    <SavedOpinions />
                  </PublicRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PublicRoute>
                    <Settings />
                  </PublicRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <PublicRoute>
                    <Account />
                  </PublicRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </SidebarProvider>
        </BrowserRouter>
      </OpinionsProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
