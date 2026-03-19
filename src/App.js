import { fetchTransactions } from "./services/api";
import {
  calculateMonthlyRewardsForCustomers,
  calculateTotalRewardsForCustomers,
} from "./utils/rewardsService";
import Card from "./components/common/Card/Card";
import Loader from "./components/common/Loader/Loader";
import ErrorMessage from "./components/common/ErrorMessage/ErrorMessage";
import "./styles/global.css";
import { TABLE_CONFIG, UI_TEXT } from "./constants/constants";
import useFetch from "./hooks/useFetch";
import { useState } from "react";
import Table from "./components/common/Table/Table";

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
  const [view, setView] = useState("transactions");
  const { data: transactions, loading, error } = useFetch(fetchTransactions);

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
  const tableConfig = {
    canSearch: true,
    defaultRowsPerPage: 10,
    rowsPerPageOptions: TABLE_CONFIG.DEFAULT_ROWS_PER_PAGE_OPTIONS,
  };

  if (view === "transactions") {
    tableConfig.rows = transactions;
    tableConfig.columns = [
      { key: "transactionId", header: "Transaction ID" },
      { key: "customerName", header: "Customer Name", sortable: true },
      { key: "purchaseDate", header: "Purchase Date", sortable: true },
      { key: "product", header: "Product Purchased" },
      { key: "price", header: "Price", sortable: true },
      { key: "rewardPoints", header: "Reward Points", sortable: true },
    ];
  }

  if (view === "monthly") {
    tableConfig.rows = calculateMonthlyRewardsForCustomers(transactions);
    tableConfig.columns = [
      { key: "customerId", header: "Customer ID" },
      { key: "customerName", header: "Name" },
      { key: "month", header: "Month", sortable: true },
      { key: "year", header: "Year", sortable: true },
      { key: "rewardPoints", header: "Reward Points", sortable: true },
    ];
  }
  if (view === "total") {
    tableConfig.rows = calculateTotalRewardsForCustomers(transactions);
    tableConfig.columns = [
      { key: "customerName", header: "Customer Name", sortable: true },
      { key: "rewardPoints", header: "Total Reward Points", sortable: true },
    ];
  }
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{UI_TEXT.DASHBOARD_TITLE}</h1>
        <select
          className="view-dropdown"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="transactions">Transactions</option>
          <option value="monthly">Monthly Rewards</option>
          <option value="total">Total Rewards</option>
        </select>
      </header>
      <div className="app-content">
        <Card>
          <Table {...tableConfig} />
        </Card>
      </div>
    </div>
  );
}
