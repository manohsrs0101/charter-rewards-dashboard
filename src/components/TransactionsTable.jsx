import PropTypes from "prop-types";
import Table from "./common/Table/Table";
import { TABLE_CONFIG, UI_TEXT } from "../constants/constants";
import { addRewardPointsToTransactions } from "../utils";

const columns = [
  { key: "transactionId", header: "Transaction ID" },
  { key: "customerName", header: "Customer Name", sortable: true },
  { key: "purchaseDate", header: "Purchase Date", sortable: true },
  { key: "product", header: "Product Purchased" },
  { key: "price", header: "Price", sortable: true },
  { key: "rewardPoints", header: "Reward Points", sortable: true },
];

/**
 * Render transactions list with reward points in a sortable/searchable table.
 *
 * @param {Object} props
 * @param {Array<Object>} props.transactions - raw transactions data
 * @returns {JSX.Element}
 */
export default function TransactionsTable({ transactions }) {
  const transactionsWithRewards = addRewardPointsToTransactions(transactions);
  return (
    <Table
      columns={columns}
      rows={transactionsWithRewards}
      canSearch={true}
      defaultRowsPerPage={10}
      rowsPerPageOptions={TABLE_CONFIG.DEFAULT_ROWS_PER_PAGE_OPTIONS}
      tableTitle={UI_TEXT.TABLE_TITLE_TRANSACTIONS}
    />
  );
}

TransactionsTable.propTypes = {
  transactions: PropTypes.array.isRequired,
};
