import { sepolia } from "wagmi/chains";
import { AddressMap } from "types";
import { Address } from "viem";

if (!process.env.REACT_APP_PIGHOBANK_CONTRACT_ADDRESS) {
  throw Error("REACT_APP_PIGHOBANK_CONTRACT_ADDRESS not provided");
}
export const PIGHOBANK_CONTRACT_ADDRESS_MAP: AddressMap = {
  [sepolia.id]: process.env.REACT_APP_PIGHOBANK_CONTRACT_ADDRESS as Address,
};
