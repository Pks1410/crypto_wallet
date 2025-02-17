import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cryptomarket.css";

const CryptoMarket = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Crypto Market Data from CoinGecko
  const fetchMarketData = async () => {
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
      setMarketData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching market data:", error);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Fetch data every 60 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <h2>Crypto Market Prices</h2>
      {loading ? (
        <p>Loading market data...</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Price (USD)</th>
              <th>Market Cap</th>
              <th>24h Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((crypto, index) => (
              <tr key={crypto.id}>
                <td>{index + 1}</td>
                <td>{crypto.name} ({crypto.symbol.toUpperCase()})</td>
                <td>${crypto.current_price.toLocaleString()}</td>
                <td>${crypto.market_cap.toLocaleString()}</td>
                <td
                  style={{
                    color: crypto.price_change_percentage_24h >= 0 ? "green" : "red",
                  }}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CryptoMarket;
