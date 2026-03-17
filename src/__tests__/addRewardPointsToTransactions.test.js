import { addRewardPointsToTransactions } from "../utils/addRewardPointsToTransactions";

describe("addRewardPointsToTransactions", () => {
  it("returns empty array when no transactions", () => {
    const result = addRewardPointsToTransactions([]);
    expect(result).toEqual([]);
  });

  it("should add rewardPoints and normalize purchaseDate for each transaction", () => {
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
    ];

    const result = addRewardPointsToTransactions(input);

    expect(result).toHaveLength(3);

    expect(result[0]).toMatchObject({
      transactionId: "TNX-100001",
      customerId: "CUST-1001",
      customerName: "Gary Moore",
      purchaseDate: "2025-05-01",
      product: "Headphones",
      price: 199.99,
      rewardPoints: 248, // 50 + (Math.floor(199.99) - 100) * 2 = 50 + 99*2 = 248
    });

    expect(result[1]).toMatchObject({
      purchaseDate: "2024-11-23",
      rewardPoints: 0,
    });

    expect(result[2]).toMatchObject({
      purchaseDate: "2026-03-20",
      rewardPoints: 25,
    });
  });

  it("should not mutate the original transactions array", () => {
    const input = [
      {
        transactionId: "TNX-100010",
        customerId: "CUST-1020",
        customerName: "Noah Walker",
        purchaseDate: "2024-12-31T23:59:59.999Z",
        product: "Watch",
        price: 120,
      },
    ];

    const inputCopy = JSON.parse(JSON.stringify(input));
    const output = addRewardPointsToTransactions(input);

    expect(input).toEqual(inputCopy);
    expect(output[0]).not.toBe(input[0]);
  });
});
