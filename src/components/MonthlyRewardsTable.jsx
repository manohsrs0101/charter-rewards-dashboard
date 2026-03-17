import PropTypes from "prop-types";
import Table from "./common/Table/Table";
import { TABLE_CONFIG, UI_TEXT } from "../constants/constants";
import {
  addRewardPointsToTransactions,
  calculateMonthlyRewardsForCustomers,
} from "../utils";

const columns = [
  { key: "customerId", header: "Customer ID" },
  { key: "customerName", header: "Name" },
  { key: "month", header: "Month", sortable: true },
  { key: "year", header: "Year", sortable: true },
  { key: "rewardPoints", header: "Reward Points", sortable: true },
];

/**
 * Render monthly reward totals for each customer in table form.
 *
 * Steps:
 * 1. Add reward points to each transaction.
 * 2. Group by customer/month/year.
 * 3. Render with Table component.
 *
 * @param {Object} props
 * @param {Array<Object>} props.transactions - array of raw transactions.
 * @returns {JSX.Element}
 */
export default function MonthlyRewardsTable({ transactions }) {
  const transactionsWithRewards = addRewardPointsToTransactions(transactions);
  const monthlyRewards = calculateMonthlyRewardsForCustomers(
    transactionsWithRewards,
  );
  return (
    <Table
      columns={columns}
      rows={monthlyRewards}
      canSearch={true}
      defaultRowsPerPage={TABLE_CONFIG.DEFAULT_ROWS_PER_PAGE}
      rowsPerPageOptions={TABLE_CONFIG.DEFAULT_ROWS_PER_PAGE_OPTIONS}
      tableTitle={UI_TEXT.TABLE_TITLE_MONTHLY_REWARDS}
    />
  );
}

MonthlyRewardsTable.propTypes = {
  transactions: PropTypes.array.isRequired,
};
