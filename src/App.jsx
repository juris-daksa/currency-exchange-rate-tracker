import React, { useContext } from "react";
import { ExchangeRatesContext } from "./context/ExchangeRatesContext";

const App = () => {
  const { exchangeRates, loading, error } = useContext(ExchangeRatesContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Historical Exchange Rates (Base: EURO)</h1>
      {Object.entries(exchangeRates).map(([date, rates]) => (
        <div key={date}>
          <h3>{date}</h3>
          <p>EUR → GBP: {rates.GBP}</p>
          <p>EUR → USD: {rates.USD}</p>
          <p>EUR → AUD: {rates.AUD}</p>
        </div>
      ))}
    </div>
  );
};

export default App;