// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// // import CryptoMarket from "./components/cryptomarket";
// import CryptoTable from "./components/cryptotable";
// import WalletManager from "./components/walletManager";
// import WalletDashboard from "./components/walletdashboard";
// import Signup from "./signup";
// import Login from "./login";
// import "./App.css";

// const App = () => {
//   return (
//     <Router>
//       <Navbar /> {/* Navbar is always visible */}
//       <div className="app-container">
//         <Routes>
//           {/* Default landing page */}
//           <Route path="/" element={<CryptoTable />} />
//           <Route path="/walletmanager" element={<WalletManager />} />
//           <Route path="/walletdashboard" element={<WalletDashboard />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CryptoTable from "./components/cryptotable";
import CryptoConverter from "./components/cryptoconvertor"; // Importing CryptoConverter
import WalletManager from "./components/walletManager";
import WalletDashboard from "./components/walletdashboard";
import Signup from "./signup";
import Login from "./login";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar is always visible */}
      <div className="app-container">
        <Routes>
          {/* Default landing page with Crypto Table & Converter */}
          <Route 
            path="/" 
            element={
              <div>
                <CryptoTable />
                <CryptoConverter />
              </div>
            } 
          />
          <Route path="/walletmanager" element={<WalletManager />} />
          <Route path="/walletdashboard" element={<WalletDashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;




