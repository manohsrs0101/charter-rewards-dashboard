import { calculateTotalRewardsForCustomers } from "../utils";
describe("calculateTotalRewardsForCustomers", () => {
  it("returns empty array with no transactions", () => {
    expect(calculateTotalRewardsForCustomers([])).toEqual([]);
  });

  it("aggregates rewardPoints by customerId", () => {
    const transactions = [
      { customerId: "CUST-1", customerName: "Alice", rewardPoints: 10 },
      { customerId: "CUST-2", customerName: "Bob", rewardPoints: 20 },
      { customerId: "CUST-1", customerName: "Alice", rewardPoints: 15 },
    ];

    const result = calculateTotalRewardsForCustomers(transactions);

    expect(result).toHaveLength(2);

    expect(result).toEqual(
      expect.arrayContaining([
        { customerName: "Alice", rewardPoints: 25 },
        { customerName: "Bob", rewardPoints: 20 },
      ]),
    );
  });
});
