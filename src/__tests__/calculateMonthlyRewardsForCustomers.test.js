import { addRewardPointsToTransactions } from "../utils";
import { calculateMonthlyRewardsForCustomers } from "../utils";

describe("calculateMonthlyRewardsForCustomers", () => {
  it("returns empty array when no transactions", () => {
    const result = calculateMonthlyRewardsForCustomers([]);
    expect(result).toEqual([]);
  });

  it("should add monthly rewards for customers", () => {
    const input = [
      {
        transactionId: "TNX-100001",
        customerId: "CUST-1001",
        customerName: "Gary Moore",
        purchaseDate: "2025-05-01T12:30:00.000Z",
        product: "Headphones",
        price: 199.99,
      },
      {
        transactionId: "TNX-100002",
        customerId: "CUST-1002",
        customerName: "Amy Johnson",
        purchaseDate: "2024-11-23T08:15:05.512Z",
        product: "Phone",
        price: 30,
      },
      {
        transactionId: "TNX-100003",
        customerId: "CUST-1003",
        customerName: "Emily Davis",
        purchaseDate: "2026-03-20T09:00:00.000Z",
        product: "Tablet",
        price: 75.5,
      },
      {
        transactionId: "TNX-100004",
        customerId: "CUST-1001",
        customerName: "Gary Moore",
        purchaseDate: "2025-05-02T12:30:00.000Z",
        product: "Tablet",
        price: 100.9,
      },
      {
        transactionId: "TNX-100005",
        customerId: "CUST-1001",
        customerName: "Gary Moore",
        purchaseDate: "2024-06-02T12:30:00.000Z",
        product: "Tablet",
        price: 100.9,
      },
    ];

    const withRewardPoints = addRewardPointsToTransactions(input);
    const result = calculateMonthlyRewardsForCustomers(withRewardPoints);

    expect(result).toHaveLength(4);

    const mayReward = result.find(
      (item) =>
        item.customerId === "CUST-1001" &&
        item.month === "May" &&
        item.year === 2025,
    );
    const juneReward = result.find(
      (item) =>
        item.customerId === "CUST-1001" &&
        item.month === "June" &&
        item.year === 2024,
    );
    const amyReward = result.find(
      (item) => item.customerId === "CUST-1002" && item.month === "November",
    );
    const emilyReward = result.find(
      (item) => item.customerId === "CUST-1003" && item.month === "March",
    );

    expect(mayReward).toMatchObject({
      customerName: "Gary Moore",
      rewardPoints: 298,
    });
    expect(juneReward).toMatchObject({
      customerName: "Gary Moore",
      rewardPoints: 50,
    });
    expect(amyReward).toMatchObject({
      customerName: "Amy Johnson",
      rewardPoints: 0,
    });
    expect(emilyReward).toMatchObject({
      customerName: "Emily Davis",
      rewardPoints: 25,
    });
  });

  it("handles same customer across multiple months", () => {
    const input = [
      {
        transactionId: "TNX-100006",
        customerId: "CUST-1004",
        customerName: "Test User",
        purchaseDate: "2025-01-10T10:00:00.000Z",
        product: "Item1",
        price: 150.5,
      },
      {
        transactionId: "TNX-100007",
        customerId: "CUST-1004",
        customerName: "Test User",
        purchaseDate: "2025-02-15T10:00:00.000Z",
        product: "Item2",
        price: 120,
      },
      {
        transactionId: "TNX-100008",
        customerId: "CUST-1004",
        customerName: "Test User",
        purchaseDate: "2025-02-20T10:00:00.000Z",
        product: "Item3",
        price: 80.99,
      },
    ];
    const withRewardPoints = addRewardPointsToTransactions(input);
    const result = calculateMonthlyRewardsForCustomers(withRewardPoints);

    const jan = result.find((item) => item.month === "January");
    const feb = result.find((item) => item.month === "February");

    expect(jan.rewardPoints).toBe(150);
    expect(feb.rewardPoints).toBe(120);
  });
});
