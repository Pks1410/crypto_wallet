// import React from "react";
// import { motion } from "framer-motion";
// import { FaHome, FaChartLine, FaWallet, FaCog,FaUser } from "react-icons/fa";
// import "./bottomnav.css";

// const cryptoData = [
//   { pair: "LTC/USD", price: "81.78", change: "1.29%", high: "87.10", low: "81.20" },
//   { pair: "XMR/USD", price: "215.52", change: "0.91%", high: "219.79", low: "215.00" },
//   { pair: "XRP/USD", price: "2.10", change: "1.14%", high: "2.27", low: "2.07" },
//   { pair: "BTC/USD", price: "84,512.49", change: "1.14%", high: "87,382.80", low: "81,188.00" },
//   { pair: "BCH/USD", price: "305.86", change: "1.51%", high: "334.46", low: "310.00" },
//   { pair: "EOS/USD", price: "0.80", change: "1.03%", high: "0.84", low: "0.66" },
// ];

// const CryptoScroller = () => {
//   return (
//     <div className="relative w-full bg-[#0d2a52] text-white">
//       <motion.div
//         className="flex overflow-hidden whitespace-nowrap py-3"
//         animate={{ x: ["0%", "-100%"] }}
//         transition={{ ease: "linear", duration: 20, repeat: Infinity }}
//       >
//         {cryptoData.map((coin, index) => (
//           <div key={index} className="flex items-center w-56 mx-4">
//             <div className="text-sm">
//               <p className="font-bold text-green-400">{coin.pair} {coin.change}</p>
//               <p className="text-xl font-semibold">{coin.price} USD</p>
//               <p className="text-xs">High: {coin.high} | Low: {coin.low}</p>
//             </div>
//           </div>
//         ))}
//       </motion.div>

//       {/* Bottom Navigation */}
//       <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-3 flex justify-around shadow-lg">
//         <NavItem icon={<FaHome />} label="Home" />
//         <NavItem icon={<FaChartLine />} label="Markets" />
//         <NavItem icon={<FaWallet />} label="Wallet" />
//         <NavItem icon={<FaCog />} label="Settings" />
//       </div>
//     </div>
//   );
// };
// {/* <div> */}
// {/* Scrolling Market Prices */}
// {/* <div className="scroller-container">
//   <div className="scroller-content">
//     {cryptoData.map((coin, index) => (
//       <div key={index} className="market-box">
//         <p className="pair">{coin.pair}</p>
//         <p className="change" style={{ color: coin.changeColor }}>
//           {coin.change}
//         </p>
//         <p className="price">{coin.price} USD</p>
//         <p className="high-low">High: {coin.high} | Low: {coin.low}</p>
//         <p className="last-90-days">Last 90 days</p>
//       </div>
//     ))}
//   </div>
// </div>

// Bottom Navigation Bar
// <div className="bottom-nav">
//   <div className="nav-item">
//     <FaHome size={20} />
//     <span>Home</span>
//   </div>
//   <div className="nav-item">
//     <FaChartLine size={20} />
//     <span>Markets</span>
//   </div>
//   <div className="nav-item">
//     <FaUser size={20} />
//     <span>Profile</span>
//   </div>
// </div>
// </div>
// );
// };

// const NavItem = ({ icon, label }) => (
//   <div className="flex flex-col items-center text-sm cursor-pointer hover:text-gray-400">
//     {icon}
//     <p>{label}</p>
//   </div>
// );

// export default CryptoScroller; */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css"; // Ensure you import the CSS

const MarketScroller = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 6, // Fetch only the top 6 coins for now
              page: 1,
              sparkline: false,
              price_change_percentage: "24h",
            },
          }
        );

        const formattedData = response.data.map((coin) => ({
          pair: `${coin.symbol.toUpperCase()}/USD`,
          price: coin.current_price.toFixed(2),
          high: coin.high_24h.toFixed(2),
          low: coin.low_24h.toFixed(2),
          change:
            coin.price_change_percentage_24h > 0
              ? `+${coin.price_change_percentage_24h.toFixed(2)}%`
              : `${coin.price_change_percentage_24h.toFixed(2)}%`,
          changeColor: coin.price_change_percentage_24h > 0 ? "green" : "red",
        }));

        setCryptoData(formattedData);
      } catch (error) {
        console.error("Error fetching crypto data", error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <div className="scroller-container">
      <div className="scroller-content">
        {cryptoData.map((coin, index) => (
          <div key={index} className="market-box">
            <p className="pair">{coin.pair}</p>
            <p className="change" style={{ color: coin.changeColor }}>
              {coin.change}
            </p>
            <p className="price">{coin.price} USD</p>
            <p className="high-low">High: {coin.high} | Low: {coin.low}</p>
            <p className="last-90-days">Last 90 days</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketScroller;

