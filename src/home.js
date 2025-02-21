import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>My Crypto Wallet</h1>
      </header>
      <main>
        <h2>Welcome to the Home Page</h2>
        <button onClick={handleLogout}>Logout</button>
      </main>
    </div>
  );
};

export default Home;
