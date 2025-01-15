import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import Login from "@/pages/Login";
import Index from "@/pages/Index";
import Account from "@/pages/Account";
import Settings from "@/pages/Settings";
import AskFriend from "@/pages/AskFriend";
import PreviousOpinions from "@/pages/PreviousOpinions";
import SavedOpinions from "@/pages/SavedOpinions";
import PopularQuestions from "@/pages/PopularQuestions";

function App() {
  const session = useSession();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={session ? <Index /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!session ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/account"
          element={session ? <Account /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/settings"
          element={session ? <Settings /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/ask"
          element={session ? <AskFriend /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/previous"
          element={session ? <PreviousOpinions /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/saved"
          element={session ? <SavedOpinions /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/popular"
          element={session ? <PopularQuestions /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;