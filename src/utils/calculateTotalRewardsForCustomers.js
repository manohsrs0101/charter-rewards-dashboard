/**
 * Calculate aggregated total reward points per customer.
 *
 * @param {Array<Object>} transactions - transaction list with reward points.
 * @param {string} transactions[].customerId
 * @param {string} transactions[].customerName
 * @param {number} transactions[].rewardPoints
 * @returns {Array<Object>} list of customers with aggregated `rewardPoints`.
 */
export function calculateTotalRewardsForCustomers(transactions) {
  const totalRewardsForCustomer = transactions.reduce((acc, transaction) => {
    const key = transaction.customerId;
    if (!acc[key]) {
      acc[key] = {
        customerName: transaction.customerName,
        rewardPoints: 0,
      };
    }
    acc[key].rewardPoints = acc[key].rewardPoints + transaction.rewardPoints;

    return acc;
  }, {});

  return Object.values(totalRewardsForCustomer);
}
