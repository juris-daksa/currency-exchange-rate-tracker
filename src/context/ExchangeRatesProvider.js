import React, { createContext, useContext } from "react";
import useExchangeRates from "../hooks/useExchangeRates";

const ExchangeRatesContext = createContext();

export const ExchangeRatesProvider = ({ children }) => {
  const { exchangeRates, loading, error } = useExchangeRates();

  return (
    <ExchangeRatesContext.Provider value={{ exchangeRates, loading, error }}>
      {children}
    </ExchangeRatesContext.Provider>
  );
};

export const useExchangeRateContext = () => useContext(ExchangeRatesContext);