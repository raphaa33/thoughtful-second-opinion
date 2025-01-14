import { BrowserRouter } from "react-router-dom";
import { OpinionsProvider } from "./contexts/OpinionsContext";
import { SavedOpinionsProvider } from "./contexts/SavedOpinionsContext";
import { Toaster } from "@/components/ui/toaster";
import { Routes, Route } from "react-router-dom";
import PreviousOpinions from "@/pages/PreviousOpinions";
import SavedOpinions from "@/pages/SavedOpinions";

function App() {
  return (
    <BrowserRouter>
      <OpinionsProvider>
        <SavedOpinionsProvider>
          <Routes>
            <Route path="/" element={<PreviousOpinions />} />
            <Route path="/saved" element={<SavedOpinions />} />
          </Routes>
          <Toaster />
        </SavedOpinionsProvider>
      </OpinionsProvider>
    </BrowserRouter>
  );
}

export default App;
