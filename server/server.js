require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const pool = require("./db");
const cron = require("node-cron");

const app = express();
const PORT = process.env.API_PORT || 5000;

app.use(cors());
app.use(express.json());

const saveExchangeRates = async (date, rates) => {
  try {
    const query = `
      INSERT INTO exchange_rates (date, eur_to_usd, eur_to_gbp, eur_to_aud)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (date) DO UPDATE 
      SET eur_to_usd = EXCLUDED.eur_to_usd,
          eur_to_gbp = EXCLUDED.eur_to_gbp,
          eur_to_aud = EXCLUDED.eur_to_aud;
    `;
    await pool.query(query, [date, rates.USD, rates.GBP, rates.AUD]);
    console.log(`Exchange rates saved for ${date}`);
  } catch (error) {
    console.error("Error saving exchange rates:", error);
  }
};

const fetchAndSaveExchangeRates = async () => {
  try {
    const API_URL = `https://anyapi.io/api/v1/exchange/rates?base=EUR&apiKey=${process.env.ANYAPI_KEY}`;
    const response = await axios.get(API_URL);
    const { rates } = response.data;

    if (!rates?.USD || !rates?.GBP || !rates?.AUD) {
      throw new Error("Missing required currency rates in API response.");
    }

    const today = new Date().toISOString().split("T")[0];
    await saveExchangeRates(today, rates);
  } catch (error) {
    console.error("Failed to fetch and save exchange rates:", error);
  }
};

app.get("/api/exchange-rates", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM exchange_rates ORDER BY date DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

(async () => {
  await fetchAndSaveExchangeRates();
})();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

cron.schedule("1 0 * * *", async () => {
    await fetchAndSaveExchangeRates();
});