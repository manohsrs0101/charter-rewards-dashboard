/**
 * Sort rows by given column and order.
 *
 * @param {Object|null} sortConfig - sorting state. e.g. { key, order }
 * @param {Array<Object>} rows - table rows to sort.
 * @returns {Array<Object>} sorted rows (new array, original is untouched).
 */
import { TABLE_CONFIG } from "../constants/constants";
export function sortRows(sortConfig, rows) {
  if (!sortConfig) return rows;
  const { key, order } = sortConfig;
  const sortedRows = [...rows];
  return sortedRows.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    if (aValue === bValue) return 0;
    // sorting for string and numbers
    if (order === TABLE_CONFIG.SORT_ORDER_ASCENDING) {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });
}
