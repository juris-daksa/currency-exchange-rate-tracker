import { useState, useEffect } from "react";
import axios from "axios";

const useExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/exchange-rates");
        setExchangeRates(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  return { exchangeRates, loading, error };
};

export default useExchangeRates;