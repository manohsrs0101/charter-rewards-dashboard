/**
 * Group transactions by customer and calendar month/year to compute monthly reward totals.
 *
 * @param {Array<Object>} transactions - transaction list with computed reward points.
 * @param {string} transactions[].customerId - unique customer id.
 * @param {string} transactions[].customerName - customer name.
 * @param {string} transactions[].purchaseDate - ISO transaction date string (e.g., '2024-06-15T12:00:00.000Z').
 * @param {number} transactions[].rewardPoints - reward points for the transaction.
 * @returns {Array<Object>} aggregated monthly reward records with: customerId, customerName, month, year, rewardPoints.
 */
export function calculateMonthlyRewardsForCustomers(transactions) {
  const rewardsMap = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.purchaseDate);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const key = `${transaction.customerId}-${month}-${year}`;

    if (!acc[key]) {
      acc[key] = {
        customerId: transaction.customerId,
        customerName: transaction.customerName,
        month,
        year,
        rewardPoints: 0,
      };
    }

    acc[key].rewardPoints += transaction.rewardPoints;

    return acc;
  }, {});

  return Object.values(rewardsMap);
}
