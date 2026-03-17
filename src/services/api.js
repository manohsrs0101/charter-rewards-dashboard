import { APP_CONFIG, ERROR_MESSAGES } from "../constants/constants";

/**
 * Fetch transaction list from backend API.
 *
 * @async
 * @function fetchTransactions
 * @returns {Promise<Array<Object>>} transactions list in API response JSON
 * @throws {Error} when network response status is not ok
 */
export const fetchTransactions = async () => {
  const response = await fetch(`${APP_CONFIG.SERVER_BASE_URL}/transactions`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_TRANSACTIONS_FAILED);
  }
  return response.json();
};
