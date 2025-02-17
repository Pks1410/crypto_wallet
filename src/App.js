import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WalletManager from "./components/walletManager";
import WalletDashboard from "./components/walletdashboard";
import CryptoMarket from "./components/cryptomarket";
// import Signup from "./signup";
// import Login from "./login";
// import Home from "./home";
import "./App.css";

// const PrivateRoute = ({ children }) => {
//   return localStorage.getItem("token") ? children : <Navigate to="/login" />;
// };

const App = () => {
  return (
    // <Router>
      <div className="app-container">
        <header className="header">
          <h1>My Crypto Wallet</h1>
        </header>
           <main>
          {/* <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes> */}

          <WalletManager />
          <WalletDashboard />
          <CryptoMarket />
        </main>
      </div>
    // </Router>
  );
};

export default App;
