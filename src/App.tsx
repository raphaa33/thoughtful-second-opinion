import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { OpinionsProvider } from "@/contexts/OpinionsContext";
import PreviousOpinions from "@/pages/PreviousOpinions";
import SavedOpinions from "@/pages/SavedOpinions";
import Home from "@/pages/Home";
import { SavedOpinionsProvider } from "./contexts/SavedOpinionsContext";

function App() {
  return (
    <SavedOpinionsProvider>
      <OpinionsProvider>
        <Router>
          <AppSidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/previous-opinions" element={<PreviousOpinions />} />
            <Route path="/saved" element={<SavedOpinions />} />
          </Routes>
        </Router>
      </OpinionsProvider>
    </SavedOpinionsProvider>
  );
}

export default App;
