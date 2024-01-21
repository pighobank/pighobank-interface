import { sepolia } from "wagmi/chains";
import { AddressMap } from "types";
import { Address } from "viem";

export const PIGHOBANK_CONTRACT_ADDRESS_MAP: AddressMap = {
  [sepolia.id]: (process.env.REACT_APP_PIGHOBANK_CONTRACT_ADDRESS ||
    "0xa4d7121550E0E94d08DB3170E373cb85d1B880D4") as Address,
};
export const GHO_ADDRESS_MAP: AddressMap = {
  [sepolia.id]: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
};
