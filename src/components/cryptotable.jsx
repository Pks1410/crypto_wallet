import React, { useEffect, useState } from "react";
import axios from "axios";

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setLoading(false);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="crypto-table">
      <h2>Crypto Market</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>24h Volume</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((coin) => (
              <tr key={coin.id}>
                <td>
                  <img src={coin.image} alt={coin.name} width="20" height="20" /> {coin.symbol.toUpperCase()} {coin.name}
                </td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td style={{ color: coin.price_change_percentage_24h < 0 ? "red" : "green" }}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>${coin.total_volume.toLocaleString()}</td>
                <td>${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CryptoTable;
