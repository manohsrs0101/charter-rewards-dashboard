import { calculateRewardPointsForTransactions } from "./calculateRewardPointsForTransactions";

/**
 * Attach calculated reward points and normalized date to each transaction.
 *
 * @param {Array<Object>} transactions - Array of transaction objects.
 * @param {string} transactions[].purchaseDate - ISO start date string (e.g., '2025-05-01T12:34:56.000Z').
 * @param {number} transactions[].price - Price used for reward computation.
 * @returns {Array<Object>} transactions with added `rewardPoints` and normalized `purchaseDate` ('YYYY-MM-DD').
 */
export function addRewardPointsToTransactions(transactions) {
  transactions = Array.isArray(transactions) ? transactions : [];
  return transactions.map((transaction) => ({
    ...transaction,
    purchaseDate: transaction.purchaseDate.split("T")[0],
    rewardPoints: calculateRewardPointsForTransactions(transaction.price),
  }));
}
