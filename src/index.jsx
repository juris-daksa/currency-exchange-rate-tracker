import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ExchangeRatesProvider } from "./context/ExchangeRatesProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ExchangeRatesProvider>
    <App />
  </ExchangeRatesProvider>
);