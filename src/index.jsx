import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ExchangeRatesProvider } from "./context/ExchangeRatesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ExchangeRatesProvider>
    <App />
  </ExchangeRatesProvider>
);