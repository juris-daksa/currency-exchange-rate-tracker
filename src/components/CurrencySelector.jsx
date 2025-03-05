import React, { useRef, useEffect } from "react";

const CurrencySelector = ({ currencies, selectedCurrency, onCurrencySelect, setShowCurrencyList }) => {
  const currencyListRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (currencyListRef.current && !currencyListRef.current.contains(event.target)) {
        setShowCurrencyList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowCurrencyList]);

  return (
    <ul className="currency-list" ref={currencyListRef}>
      {currencies.map((currency) => (
        <li 
          key={currency}
          className={`currency-item ${currency === selectedCurrency ? "selected" : ""}`}
          onClick={() => {
            onCurrencySelect(currency);
            setShowCurrencyList(false);
          }}
        >
          {currency}
        </li>
      ))}
    </ul>
  );
};

export default CurrencySelector;