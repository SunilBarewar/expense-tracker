import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import "./App.css";
import PaymentSuccess from "./components/PaymentSuccess";
import ResetPassword from "./pages/ResetPassword";
import SendEmail from "./pages/ResetPassword/SendEmail";
import LeaderBoard from "./pages/LeaderBoard";
function App() {
  const { authState } = useContext(AuthContext);

  return (
    <div className="w-full min-h-screen relative font-poppins mx-auto" id="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={authState ? <Dashboard /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!authState ? <Auth /> : <Navigate to="/" />}
          />

          <Route path="/paymentsuccess" element={<PaymentSuccess />} />

          <Route
            path="/reset-password"
            element={!authState ? <SendEmail /> : <Navigate to="/" />}
          />
          <Route
            path="/reset-password/:request_id"
            element={<ResetPassword />}
          />

          <Route
            path="/leaderboard"
            element={authState ? <LeaderBoard /> : <Navigate to="/auth" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
