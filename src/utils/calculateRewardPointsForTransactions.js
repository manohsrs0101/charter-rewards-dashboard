/**
 * Calculate reward points for a transaction amount.
 *
 * Rules:
 * - 1 point for each dollar spent over $50 up to $100
 * - 2 points for each dollar spent over $100
 *
 * @param {number} price - Transaction amount.
 * @returns {number} reward points for the transaction.
 */
export function calculateRewardPointsForTransactions(price) {
  const amount = Math.floor(price);
  let points = 0;
  if (amount > 100) {
    points += 50;
    points += (amount - 100) * 2;
  } else if (amount > 50) {
    points += amount - 50;
  }
  return points;
}
