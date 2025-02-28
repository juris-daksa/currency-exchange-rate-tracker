require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const pool = require("./db");

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
  } catch (err) {
    console.error("Error saving exchange rates:", err);
  }
};

// mock API req
const fetchExchangeRates = async () => {
  const today = new Date().toISOString().split("T")[0];
  const mockRates = { GBP: 0.85, USD: 1.08, AUD: 1.66 };
  await saveExchangeRates(today, mockRates);
};

app.get("/api/exchange-rates", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM exchange_rates ORDER BY date DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

fetchExchangeRates(); // get fresh data when app is started

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});