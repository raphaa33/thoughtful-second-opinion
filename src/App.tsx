import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { OpinionsProvider } from "@/contexts/OpinionsContext"
import Index from "./pages/Index"
import PreviousOpinions from "./pages/PreviousOpinions"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OpinionsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gray-50">
              <AppSidebar />
              <SidebarInset>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/previous-opinions" element={<PreviousOpinions />} />
                </Routes>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </OpinionsProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App