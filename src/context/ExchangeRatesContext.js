import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ExchangeRatesContext = createContext(null);

export const ExchangeRatesProvider = ({ children }) => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/exchange-rates")
      .then((response) => {
        setExchangeRates(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch exchange rates.");
        setLoading(false);
      });
  }, []);

  return (
    <ExchangeRatesContext.Provider value={{ exchangeRates, loading, error }}>
      {children}
    </ExchangeRatesContext.Provider>
  );
};