import { useEffect, useState } from "react";
import { fetchTransactions } from "./services/api";
import TransactionsTable from "./components/TransactionsTable";
import MonthlyRewardsTable from "./components/MonthlyRewardsTable";
import TotalRewardsTable from "./components/TotalRewardsTable";
import Card from "./components/common/Card/Card";
import Loader from "./components/common/Loader/Loader";
import { logger } from "./utils";
import ErrorMessage from "./components/common/ErrorMessage/ErrorMessage";
import "./styles/global.css";
import { ERROR_MESSAGES, UI_TEXT } from "./constants/constants";

/**
 * App root component.
 *
 * Responsibilities:
 * - Fetch transactions from backend API
 * - Handle loading and error states
 * - Render transaction table and rewards summary tables
 *
 * @returns {JSX.Element}
 */
export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true)
        const data = await fetchTransactions();
        logger.info(UI_TEXT.TRANSACTIONS_LOADED_SUCCESSFULLY);
        setTransactions(data);
      } catch (err) {
        logger.error(err?.message || ERROR_MESSAGES.FETCH_TRANSACTIONS_FAILED);
        setError(err?.message || ERROR_MESSAGES.FETCH_TRANSACTIONS_FAILED);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  if (loading) {
    return (
      <Card>
        <Loader message={UI_TEXT.LOADING_TRANSACTIONS} />
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <ErrorMessage message={error} />
      </Card>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{UI_TEXT.DASHBOARD_TITLE}</h1>
      </header>
      <div className="app-content">
        <Card>
          <TransactionsTable transactions={transactions} />
        </Card>
        <Card>
          <MonthlyRewardsTable transactions={transactions} />
        </Card>
        <Card>
          <TotalRewardsTable transactions={transactions} />
        </Card>
      </div>
    </div>
  );
}
