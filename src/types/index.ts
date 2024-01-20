import { Address, Chain } from "viem";

export type AddressMap = {
  [key: Chain["id"]]: Address;
};

export type Deposit = {
  index: number;
  amount: bigint;
  depositTimestamp: bigint;
  withdrawnAmount: bigint;
  emergencyReleaseSigner: Address;
  emergencyReleaseAmount: bigint;
  periods: bigint;
};
