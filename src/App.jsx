import React from "react";
import "./styles.scss";
import ExchangeRatesTable from "./components/ExchangeRatesTable";
import { useExchangeRateContext } from "./context/ExchangeRatesProvider";

const App = () => {
  const { loading, error } = useExchangeRateContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ExchangeRatesTable />
    </div>
  );
};

export default App;