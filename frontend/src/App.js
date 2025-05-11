import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Web3Provider } from "./context/web3context.js";
import Navbar from "./components/Navbar";
import Auth from "./features/auth/Auth";
// import Login from "./features/auth/login";
// import Signup from "./features/auth/signup";
import ImportWallet from "./features/wallet/importwallet.jsx";
import ConnectWallet from "./features/wallet/connectwallet.jsx";
import Profile from "./features/profile/profile.jsx";
import NFTMarketplace from "./features/nft/nftmarketplace.jsx";
import NFTDetails from "./features/nft/nftdetails.js";
import CryptoMarket from "./features/crypto/cryptomarket.jsx";
import CryptoConverter from "./features/crypto/cryptoconvertor.jsx";
import CryptoTable from "./features/crypto/cryptotable.jsx";
import CryptoScroller from "./components/bottomnav.jsx";
import ParticlesBackground from "./components/common/particles.js";
const ScrollToTop = () => {
  // eslint-disable-next-line no-undef
  const { pathname } = useLocation();

  // eslint-disable-next-line no-undef
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <Web3Provider>
    <Router>
      <div className="app-wrapper">
        <ParticlesBackground />
        <ScrollToTop />
        <div className="app-content">
          <Navbar />
          <div className="app-container">
            <Routes>
              <Route 
                path="/" 
                element={
                  <>
                    <CryptoTable />
                    <CryptoConverter />
                    <CryptoMarket />
                    <CryptoScroller />
                  </>
                } 
              />
              <Route path="/auth" element={<Auth />} />
        <Route path="/import-wallet" element={<ConnectWallet />} />
        <Route path="/create-nft" element={<NFTMarketplace />} />
        <Route path="/connect-wallet" element={<ImportWallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/NFTmarketplace" element={<NFTMarketplace />} />
              <Route path="/nft-details/:id" element={<NFTDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    </Web3Provider>
    </AuthProvider>
    
  );
};

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/Navbar";
// import Auth from "./features/auth/Auth";
// import Login from "./features/auth/login";
// import Signup from "./features/auth/signup";
// import ImportWallet from "./features/wallet/importwallet.jsx";
// import ConnectWallet from "./features/wallet/connectwallet.jsx";
// import Profile from "./features/profile/profile.jsx";
// import NFTMarketplace from "./features/nft/nftmarketplace.jsx";
// import NFTDetails from "./features/nft/nftdetails.js";
// import CryptoMarket from "./features/crypto/cryptomarket.jsx";
// import CryptoConverter from "./features/crypto/cryptoconvertor.jsx";
// import CryptoTable from "./features/crypto/cryptotable.jsx";
// // import MarketScroller from "./components/common/bottomnav.jsx"; // Uncomment if needed

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <div>
//                 <CryptoMarket />
//                 <CryptoConverter />
//                 <CryptoTable />
//                 {/* <MarketScroller /> */}
//               </div>
//             }
//           />
//           <Route path="/auth" element={<Auth />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/import-wallet" element={<ImportWallet />} />
//           <Route path="/connect-wallet" element={<ConnectWallet />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/create-nft" element={<NFTMarketplace />} />
//           <Route path="/nft-details" element={<NFTDetails />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;