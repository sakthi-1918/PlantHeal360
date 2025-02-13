import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import DiseaseList from "./pages/DiseaseList";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function AppContent() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!hideNavbar && <Navbar />}

      {/* Main content */}
      <div style={{ marginTop: !hideNavbar ? "80px" : "0px" }}>
        <Routes>
          <Route path="/library" element={<DiseaseList />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
