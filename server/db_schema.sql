CREATE TABLE exchange_rates (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    eur_to_usd DECIMAL(10,4) NOT NULL,
    eur_to_gbp DECIMAL(10,4) NOT NULL,
    eur_to_aud DECIMAL(10,4) NOT NULL
);