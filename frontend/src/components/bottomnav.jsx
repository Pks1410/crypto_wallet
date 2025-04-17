import React, { useEffect, useState } from "react";
import axios from "axios";
import "./bottomnav.css"; // Ensure CSS is linked

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
              per_page: 6, // Fetch 6 coins
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

        setCryptoData([...formattedData, ...formattedData]); // Duplicate for smooth looping
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
