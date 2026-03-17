/**
 * Paginate rows using page and page size.
 *
 * @param {number} currentPage
 * @param {number} rowsPerPage
 * @param {Array<Object>} rows
 * @returns {Array<Object>} rows for current page
 */
export function paginateRows(currentPage, rowsPerPage, rows) {
  const start = currentPage === 1 ? 0 : (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return rows.slice(start, end);
}
