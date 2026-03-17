import PropTypes from "prop-types";
import Table from "./common/Table/Table";
import { UI_TEXT } from "../constants/constants";
import {
  addRewardPointsToTransactions,
  calculateTotalRewardsForCustomers,
} from "../utils";

const columns = [
  { key: "customerName", header: "Customer Name", sortable: true },
  { key: "rewardPoints", header: "Total Reward Points", sortable: true },
];

/**
 * Render a table with total reward points per customer.
 *
 * Workflow:
 * 1. Enrich transactions with reward points.
 * 2. Aggregate reward points by customer.
 * 3. Display data in table with sorting and search.
 *
 * @param {Object} props
 * @param {Array<Object>} props.transactions - raw transactions list
 * @returns {JSX.Element}
 */
export default function TotalRewardsTable({ transactions }) {
  const transactionsWithRewardPoints =
    addRewardPointsToTransactions(transactions);
  const customersWithRewardPoints = calculateTotalRewardsForCustomers(
    transactionsWithRewardPoints,
  );
  return (
    <Table
      columns={columns}
      rows={customersWithRewardPoints}
      canSearch={true}
      defaultRowsPerPage={5}
      rowsPerPageOptions={[5, 10, 15, 20, 50]}
      tableTitle={UI_TEXT.TABLE_TITLE_TOTAL_REWARDS}
    />
  );
}

TotalRewardsTable.propTypes = {
  transactions: PropTypes.array.isRequired,
};
