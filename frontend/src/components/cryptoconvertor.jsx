// import React, { useState, useEffect } from "react";
// import "./cryptoconvertor.css";

// const CryptoConverter = () => {
//   const [cryptoAmount, setCryptoAmount] = useState(1);
//   const [fromCurrency, setFromCurrency] = useState("BTC");
//   const [toCurrency, setToCurrency] = useState("USD");
//   const [conversionRate, setConversionRate] = useState(null);
//   const [convertedAmount, setConvertedAmount] = useState(0);

//   // Supported cryptos & fiat currencies
//   const currencyOptions = ["BTC", "ETH", "USDT", "BNB", "SOL", "USD", "EUR", "INR"];

//   useEffect(() => {
//     fetchConversionRate();
//   }, [fromCurrency, toCurrency]);

//   const fetchConversionRate = async () => {
//     try {
//       const response = await fetch(
//         `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency.toLowerCase()}&vs_currencies=${toCurrency.toLowerCase()}`
//       );
//       const data = await response.json();
//       const rate = data[fromCurrency.toLowerCase()]?.[toCurrency.toLowerCase()] || 1;
//       setConversionRate(rate);
//       setConvertedAmount(cryptoAmount * rate);
//     } catch (error) {
//       console.error("Error fetching conversion rate:", error);
//     }
//   };

//   const handleAmountChange = (e) => {
//     const amount = parseFloat(e.target.value);
//     setCryptoAmount(amount);
//     setConvertedAmount(amount * conversionRate);
//   };

//   return (
//     <div className="crypto-converter">
//       <h2>Crypto Converter</h2>
//       <div className="converter-container">
//         <input
//           type="number"
//           value={cryptoAmount}
//           onChange={handleAmountChange}
//           min="0"
//         />
//         <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
//           {currencyOptions.map((curr) => (
//             <option key={curr} value={curr}>
//               {curr}
//             </option>
//           ))}
//         </select>
//         <span> = </span>
//         <input type="text" value={convertedAmount.toFixed(4)} readOnly />
//         <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
//           {currencyOptions.map((curr) => (
//             <option key={curr} value={curr}>
//               {curr}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default CryptoConverter;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaExchangeAlt } from "react-icons/fa"; // Import swap icon

// const CryptoConverter = () => {
//   const [amount, setAmount] = useState(1);
//   const [fromCurrency, setFromCurrency] = useState("SOL");
//   const [toCurrency, setToCurrency] = useState("BTC");
//   const [convertedAmount, setConvertedAmount] = useState(0);
//   const [exchangeRates, setExchangeRates] = useState({});

//   useEffect(() => {
//     fetchExchangeRates();
//   }, []);

//   const fetchExchangeRates = async () => {
//     try {
//       const response = await axios.get(
//         "https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount=1&symbol=BTC&convert=INR",
//         {
//           params: {
//             ids: "bitcoin,ethereum,binancecoin,solana,cardano,dogecoin,tether,usd-coin,xrp,trx",
//             vs_currencies: "usd",
//           },
//         }
//       );
//       setExchangeRates(response.data);
//     } catch (error) {
//       console.error("Error fetching exchange rates:", error);
//     }
//   };

//   useEffect(() => {
//     convertCrypto();
//   }, [amount, fromCurrency, toCurrency, exchangeRates]);

//   const convertCrypto = () => {
//     if (!exchangeRates[fromCurrency.toLowerCase()] || !exchangeRates[toCurrency.toLowerCase()]) {
//       return;
//     }
//     const fromPrice = exchangeRates[fromCurrency.toLowerCase()].usd;
//     const toPrice = exchangeRates[toCurrency.toLowerCase()].usd;
//     const result = (amount * fromPrice) / toPrice;
//     setConvertedAmount(result.toFixed(8)); // Match precision
//   };

//   const swapCurrencies = () => {
//     setFromCurrency(toCurrency);
//     setToCurrency(fromCurrency);
//   };

//   return (
//     <div className="crypto-converter">
//       <h2>Crypto Converter</h2>
//       <div className="converter-container">
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="input-field"
//         />
//         <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
//           <option value="BTC">Bitcoin (BTC)</option>
//           <option value="ETH">Ethereum (ETH)</option>
//           <option value="BNB">Binance Coin (BNB)</option>
//           <option value="SOL">Solana (SOL)</option>
//           <option value="ADA">Cardano (ADA)</option>
//           <option value="DOGE">Dogecoin (DOGE)</option>
//           <option value="XRP">XRP</option>
//           <option value="TRX">Tron (TRX)</option>
//           <option value="USDT">Tether (USDT)</option>
//           <option value="USDC">USD Coin (USDC)</option>
//         </select>

//         <button className="swap-btn" onClick={swapCurrencies}>
//           <FaExchangeAlt />
//         </button>

//         <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
//           <option value="BTC">Bitcoin (BTC)</option>
//           <option value="ETH">Ethereum (ETH)</option>
//           <option value="BNB">Binance Coin (BNB)</option>
//           <option value="SOL">Solana (SOL)</option>
//           <option value="ADA">Cardano (ADA)</option>
//           <option value="DOGE">Dogecoin (DOGE)</option>
//           <option value="XRP">XRP</option>
//           <option value="TRX">Tron (TRX)</option>
//           <option value="USDT">Tether (USDT)</option>
//           <option value="USDC">USD Coin (USDC)</option>
//         </select>
//       </div>

//       <p className="conversion-result">
//         {amount} {fromCurrency} = <span className="highlight">{convertedAmount}</span> {toCurrency}
//       </p>

//       <button className="refresh-btn" onClick={fetchExchangeRates}>Refresh</button>
//     </div>
//   );
// };

// export default CryptoConverter;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaExchangeAlt } from "react-icons/fa"; // Swap icon
// import "./cryptoconvertor.css"; // Ensure styling

// const API_KEY = "59d246d71030b255fafb32e2af2d0bdc"; // ⚠️ Store securely in .env file

// const CryptoConverter = () => {
//   const [amount, setAmount] = useState(1);
//   const [fromCurrency, setFromCurrency] = useState("BTC");
//   const [toCurrency, setToCurrency] = useState("USD");
//   const [convertedAmount, setConvertedAmount] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const currencyOptions = [
//     "BTC", "ETH", "BNB", "SOL", "ADA", "DOGE", "XRP", "TRX", "USDT", "USDC", "INR", "EUR", "USD"
//   ];

//   useEffect(() => {
//     if (amount > 0) {
//       fetchConversionRate();
//     }
//   }, [amount, fromCurrency, toCurrency]);

//   const fetchConversionRate = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "https://api.binance.com/api/v3/ticker/price",
//         {
//           headers: { "X-CMC_PRO_API_KEY": API_KEY },
//           params: { amount, symbol: fromCurrency, convert: toCurrency },
//         }
//       );

//       const rate = response.data.data.quote[toCurrency].price || 1;
//       setConvertedAmount(rate.toFixed(6));
//     } catch (error) {
//       console.error("Error fetching conversion rate:", error);
//       setConvertedAmount("Error");
//     }
//     setLoading(false);
//   };

//   const swapCurrencies = () => {
//     setFromCurrency(toCurrency);
//     setToCurrency(fromCurrency);
//   };

//   return (
//     <div className="crypto-converter">
//       <h2>Crypto Converter</h2>
//       <div className="converter-container">
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="input-field"
//           min="0"
//         />
//         <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
//           {currencyOptions.map((curr) => (
//             <option key={curr} value={curr}>{curr}</option>
//           ))}
//         </select>

//         <button className="swap-btn" onClick={swapCurrencies}>
//           <FaExchangeAlt />
//         </button>

//         <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
//           {currencyOptions.map((curr) => (
//             <option key={curr} value={curr}>{curr}</option>
//           ))}
//         </select>
//       </div>

//       <p className="conversion-result">
//         {amount} {fromCurrency} ={" "}
//         <span className="highlight">{loading ? "Loading..." : convertedAmount}</span> {toCurrency}
//       </p>

//       <button className="refresh-btn" onClick={fetchConversionRate}>Refresh</button>
//     </div>
//   );
// };

// export default CryptoConverter;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaExchangeAlt } from "react-icons/fa";
import "./cryptoconvertor.css";
const API_KEY = process.env.REACT_APP_API_KEY;

const CryptoConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const currencyOptions = ["BTC", "ETH", "USDT", "BNB", "SOL", "INR", "USD", "EUR"];

  useEffect(() => {
    if (amount > 0) {
      fetchConversionRate();
    }
  }, [amount, fromCurrency, toCurrency]);

  // const fetchConversionRate = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/tools/price-conversion`, 
  //       {
  //         headers: { "X-CMC_PRO_API_KEY": API_KEY },
  //       params: {
  //         amount: amount,
  //         symbol: fromCurrency,  // Fix here: `symbol` instead of `from`
  //         convert: toCurrency,   // Fix here: `convert` instead of `to`
  //       },
  //     });
  //     // setConvertedAmount(response.data.convertedValue || 0);
  //     const convertedValue = response.data.data.quote[toCurrency].price || 0;
  //     setConvertedAmount(convertedValue.toFixed(6));
  //   } catch (error) {
  //     console.error("Error fetching conversion rate:", error);
  //     setConvertedAmount("Error");
  //   }
  //   setLoading(false);
  // };
  const fetchConversionRate = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/tools/price-conversion`, {
        headers: { "X-CMC_PRO_API_KEY": API_KEY },
        params: {
          amount: amount,
          symbol: fromCurrency,
          convert: toCurrency,
        },
      });
      
  
      console.log("API Response:", response.data); // Debugging
  
      if (response.data && response.data.data && response.data.data.quote[toCurrency]) {
        const convertedValue = response.data.data.quote[toCurrency].price || 0;
        setConvertedAmount(convertedValue.toFixed(6)); // Format to 6 decimal places
      } else {
        console.error("Error: Missing conversion data.");
        setConvertedAmount("Error");
      }
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
      setConvertedAmount("Error");
    }
    setLoading(false);
  };
  
  

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="crypto-converter">
      <h2>Crypto Converter</h2>
      <div className="converter-container">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencyOptions.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>

        <button className="swap-btn" onClick={swapCurrencies}>
          <FaExchangeAlt />
        </button>

        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencyOptions.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>

      <p className="conversion-result">
        {amount} {fromCurrency} ={" "}
        <span className="highlight">
          {loading ? "Loading..." : convertedAmount}
        </span>{" "}
        {toCurrency}
      </p>
    </div>
  );
};

export default CryptoConverter;

