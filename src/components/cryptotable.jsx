// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./cryptomarket.css";

// const CryptoTable = () => {
//   const [cryptoData, setCryptoData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCryptoData = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.coingecko.com/api/v3/coins/markets",
//           {
//             params: {
//               vs_currency: "usd",
//               order: "market_cap_desc",
//               per_page: 10,
//               page: 1,
//               sparkline: false,
//             },
//           }
//         );
//         setCryptoData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching crypto data:", error);
//         setLoading(false);
//       }
//     };

//     fetchCryptoData();
//     const interval = setInterval(fetchCryptoData, 60000); // Refresh every 60 seconds
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="crypto-table">
//       <h2>Crypto Market</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Price</th>
//               <th>24h Change</th>
//               <th>24h Volume</th>
//               <th>Market Cap</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cryptoData.map((coin) => (
//               <tr key={coin.id}>
//                 <td>
//                   <img src={coin.image} alt={coin.name} width="20" height="20" /> {coin.symbol.toUpperCase()} {coin.name}
//                 </td>
//                 <td>${coin.current_price.toLocaleString()}</td>
//                 <td style={{ color: coin.price_change_percentage_24h < 0 ? "red" : "green" }}>
//                   {coin.price_change_percentage_24h.toFixed(2)}%
//                 </td>
//                 <td>${coin.total_volume.toLocaleString()}</td>
//                 <td>${coin.market_cap.toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CryptoTable;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cryptotable.css"; // Ensure you have styling
import { FaStar } from "react-icons/fa"; // Star icon for favorites

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: true, // Enables mini graphs
              price_change_percentage: "1h,24h,7d",
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching crypto data", error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <div className="crypto-table">
      <table>
        <thead>
          <tr>
            <th></th> {/* Star column */}
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>1h</th>
            <th>24h</th>
            <th>7d</th>
            <th>Market Cap</th>
            <th>Volume (24h)</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr key={coin.id}>
              <td>
                <FaStar className="star-icon" />
              </td>
              <td>{index + 1}</td>
              <td className="coin-name">
                <img src={coin.image} alt={coin.name} className="coin-logo" />
                {coin.name} <span className="symbol">{coin.symbol.toUpperCase()}</span>
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td className={coin.price_change_percentage_1h_in_currency >= 0 ? "green" : "red"}>
                {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
              </td>
              <td className={coin.price_change_percentage_24h >= 0 ? "green" : "red"}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className={coin.price_change_percentage_7d_in_currency >= 0 ? "green" : "red"}>
                {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
              </td>
              <td>${coin.market_cap.toLocaleString()}</td>
              <td>${coin.total_volume.toLocaleString()}</td>
              <td>
                <img src={coin.sparkline_in_7d} alt="trend" className="trend-chart" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
