import { formatUnits } from "viem";
import { Deposit } from "types";
import { periodDuration } from "constants/index";

export function formatGHOAmount(amount: bigint | undefined) {
  if (amount === undefined) return undefined;
  const num = Number(formatUnits(amount, 18));
  if (num > 0 && num < 0.001) return "<0.001";
  return num.toLocaleString(undefined, {
    maximumSignificantDigits: num < 0.01 ? 2 : num < 10 ? 3 : 4,
  });
}

export function getWithdrawableAmount(deposit: Deposit) {
  const now = BigInt(Math.floor(new Date().getTime() / 1000));
  let currentPeriod = (now - deposit.depositTimestamp) / periodDuration;
  currentPeriod =
    currentPeriod > deposit.periods ? deposit.periods : currentPeriod;
  return (currentPeriod * deposit.amount) / deposit.periods;
}
