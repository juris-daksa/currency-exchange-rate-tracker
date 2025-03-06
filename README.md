# Exchange Rate Tracker
This is a repository for TRODO test task

## Description
This application fetches and displays daily exchange rates for EUR to various currencies (USD, GBP, AUD). The backend fetches new rates once a day and stores them in a PostgreSQL database, while the frontend provides an interactive table with a currency selector and sorting.

## Tech Stack
### Backend:
- **Node.js** with **Express.js**
- **PostgreSQL** for storing exchange rates
- **node-cron** for scheduling daily rate updates

### Frontend:
- **React.js**
- **React Table** for displaying data
- **Context API** for state management

## Setup Instructions
### Prerequisites:
- Node.js installed
- PostgreSQL database set up

### Backend Setup:
1. Clone the repository:
   ```sh
   git clone git@github.com:juris-daksa/currency-exchange-rate-tracker.git
   cd currency-exchange-rate-tracker/server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```plaintext
   DB_USER=user
   DB_HOST=localhost
   DB_NAME=exchange_rates_db
   DB_PASSWORD=password
   DB_PORT=5432

   ANYAPI_KEY=your-api-key

   API_PORT=5000
   ```

4. Start the backend:
   ```sh
   npm start
   ```

### Frontend Setup:
1. In a new terminal instance, navigate to the frontend folder:
   ```sh
   cd currency-exchange-rate-tracker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm start
   ```
4. Navigate to `localhost:3000` in your browser.

