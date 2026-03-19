import { sortRows, filterRows, paginateRows } from "../utils/tableUtils";

import { TABLE_CONFIG } from "../constants/constants";

describe("table helper utilities", () => {
  const rows = [
    { id: 1, name: "Alice", amount: 50 },
    { id: 2, name: "Bob", amount: 120 },
    { id: 3, name: "Charlie", amount: 80 },
    { id: 4, name: "alice", amount: 30 },
  ];

  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "amount", header: "Amount" },
  ];

  describe("sortRows", () => {
    it("returns original rows when sortConfig is falsy", () => {
      expect(sortRows(null, rows)).toBe(rows);
      expect(sortRows(undefined, rows)).toBe(rows);
    });

    it("sorts ascending based on given key", () => {
      const sorted = sortRows(
        { key: "name", order: TABLE_CONFIG.SORT_ORDER_ASCENDING },
        rows,
      );
      expect(sorted.map((r) => r.name)).toEqual([
        "Alice",
        "Bob",
        "Charlie",
        "alice",
      ]);
    });

    it("sorts descending based on given key", () => {
      const sorted = sortRows(
        { key: "amount", order: TABLE_CONFIG.SORT_ORDER_DESCENDING },
        rows,
      );
      expect(sorted.map((r) => r.amount)).toEqual([120, 80, 50, 30]);
    });
  });

  describe("filterRows", () => {
    it("returns rows when canSearch is false", () => {
      expect(filterRows(false, "bob", rows, columns)).toBe(rows);
    });

    it("filters rows by case-insensitive query in any specified column", () => {
      const filtered = filterRows(true, "alice", rows, columns);
      expect(filtered).toEqual([rows[0], rows[3]]);
    });

    it("returns empty array when no match", () => {
      const filtered = filterRows(true, "zorro", rows, columns);
      expect(filtered).toEqual([]);
    });
  });

  describe("paginateRows", () => {
    it("pages rows correctly for page 1", () => {
      const paged = paginateRows(1, 2, rows);
      expect(paged).toEqual([rows[0], rows[1]]);
    });

    it("pages rows correctly for subsequent page", () => {
      const paged = paginateRows(2, 2, rows);
      expect(paged).toEqual([rows[2], rows[3]]);
    });

    it("returns empty array when page beyond limit", () => {
      expect(paginateRows(3, 2, rows)).toEqual([]);
    });
  });
});
