import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { OpinionsProvider } from "@/contexts/OpinionsContext";
import PreviousOpinions from "@/pages/PreviousOpinions";
import SavedOpinions from "@/pages/SavedOpinions";
import Home from "@/pages/Home";
import { SavedOpinionsProvider } from "./contexts/SavedOpinionsContext";
import { SidebarProvider } from "@/components/ui/sidebar";

function App() {
  return (
    <SavedOpinionsProvider>
      <OpinionsProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <Router>
              <AppSidebar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/previous-opinions" element={<PreviousOpinions />} />
                  <Route path="/saved" element={<SavedOpinions />} />
                </Routes>
              </main>
            </Router>
          </div>
        </SidebarProvider>
      </OpinionsProvider>
    </SavedOpinionsProvider>
  );
}

export default App;