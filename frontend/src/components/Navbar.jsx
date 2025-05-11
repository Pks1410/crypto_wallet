// // src/components/Navbar.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // Your auth context
// import "./Navbar.css";

// const Navbar = () => {
//   const { isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <nav className="navbar">
//       <h2>My Crypto Wallet</h2>
//       <ul className="nav-links">
//         {!isAuthenticated ? (
//           <li>
//             <button
//               className="auth-btn"
//               onClick={() => navigate("/auth")}
//             >
//               Login / Sign Up
//             </button>
//           </li>
//         ) : (
//           <>
//             <li>
//               <Link to="/import-wallet">Import Wallet</Link>
//             </li>
//             <li>
//               <Link to="/create-nft">Create NFT</Link>
//             </li>
//             <li>
//               <Link to="/connect-wallet">Connect Wallet</Link>
//             </li>
//             <li>
//               <Link to="/profile">Profile</Link>
//             </li>
//             <li>
//               <button className="auth-btn" onClick={logout}>
//                 Logout
//               </button>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h2>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          My Crypto Wallet
        </Link>
      </h2>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isAuthenticated ? (
          <li>
            <button
              className="auth-btn"
              onClick={() => navigate("/auth")}
            >
              Login / Sign Up
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/import-wallet">Import Wallet</Link>
            </li>
            <li>
              <Link to="/create-nft">Create NFT</Link>
            </li>
            <li>
              <Link to="/connect-wallet">Connect Wallet</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button className="auth-btn" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;