const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock rates
const historicalRates = {
  "2024-02-25": { GBP: 0.85, USD: 1.08, AUD: 1.66 },
  "2024-02-26": { GBP: 0.86, USD: 1.09, AUD: 1.65 },
  "2024-02-27": { GBP: 0.84, USD: 1.07, AUD: 1.67 },
};

app.get("/api/exchange-rates", (req, res) => {
  res.json(historicalRates);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
