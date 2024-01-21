export const AddressZero = "0x0000000000000000000000000000000000000000";

export const periodDurationNumber =
  Number(process.env.REACT_APP_PERIOD_DURATION) || 30 * 86400;
export const periodDuration = BigInt(periodDurationNumber);
