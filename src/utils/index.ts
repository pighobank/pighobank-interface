import { formatUnits, parseUnits } from "viem";
import { Deposit } from "types";
import { periodDuration } from "constants/index";

export function formatGHOAmount(
  amount: bigint | undefined,
  maximumSignificantDigits?: number
) {
  if (amount === undefined) return undefined;
  const num = Number(formatUnits(amount, 18));
  if (num > 0 && num < 0.001) return "<0.001";
  return num.toLocaleString(undefined, {
    maximumSignificantDigits: maximumSignificantDigits ?? 5,
  });
}

export function parseGHOAmount(amount: string | undefined) {
  if (amount === undefined) return undefined;
  return parseUnits(amount, 18);
}

export function getWithdrawableAmount(deposit: Deposit | null | undefined) {
  if (!deposit) return undefined;
  const now = BigInt(Math.floor(new Date().getTime() / 1000));
  let currentPeriod = (now - deposit.depositTimestamp) / periodDuration;
  currentPeriod =
    currentPeriod > deposit.periods ? deposit.periods : currentPeriod;
  return (
    (currentPeriod * deposit.amount) / deposit.periods +
    deposit.emergencyReleaseAmount -
    deposit.withdrawnAmount
  );
}
