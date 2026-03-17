import { calculateRewardPointsForTransactions } from "../utils";

describe("calculateRewardPointsForTransactions", () => {
  it("returns 0 for amounts <= 50", () => {
    expect(calculateRewardPointsForTransactions(0)).toBe(0);
    expect(calculateRewardPointsForTransactions(50)).toBe(0);
    expect(calculateRewardPointsForTransactions(49.99)).toBe(0);
  });

  it("adds 1 point per dollar for 51-100 range", () => {
    expect(calculateRewardPointsForTransactions(51)).toBe(1);
    expect(calculateRewardPointsForTransactions(75.99)).toBe(25); // floor 75
    expect(calculateRewardPointsForTransactions(100)).toBe(50);
  });

  it("adds 2 points per dollar over 100 plus 50 base points", () => {
    expect(calculateRewardPointsForTransactions(101)).toBe(52);
    expect(calculateRewardPointsForTransactions(120)).toBe(90); // 50 + 40
  });

  it("floors decimal prices before calculation", () => {
    expect(calculateRewardPointsForTransactions(99.99)).toBe(49);
    expect(calculateRewardPointsForTransactions(100.99)).toBe(50);
    expect(calculateRewardPointsForTransactions(199.99)).toBe(248); // floor 199 => 50 + 198
  });
});
