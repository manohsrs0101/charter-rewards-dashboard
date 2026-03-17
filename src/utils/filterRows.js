/**
 * Filter rows by search query over visible columns.
 *
 * @param {boolean} canSearch - enable/disable search filtering.
 * @param {string} searchValue - search input value.
 * @param {Array<Object>} rows - table data rows.
 * @param {Array<Object>} columns - column definitions, with `key` props.
 * @returns {Array<Object>} filtered rows.
 */
export function filterRows(canSearch, searchValue, rows, columns) {
  if (!canSearch) return rows;
  const query = searchValue.trim().toLowerCase();
  return rows.filter((row) => {
    // Array some to only check if query existing in any column ignore other cols
    return columns.some((col) => {
      const cellValue = row[col.key];
      if (cellValue === null || cellValue === undefined) return false;
      return String(cellValue).toLowerCase().includes(query);
    });
  });
}
