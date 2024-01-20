import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Abi } from "viem";
import { erc20ABI } from "wagmi";

import PiGHOBankABI from "./src/abis/PiGHOBank.json";

export default defineConfig({
  out: "src/abis/types/generated.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20ABI,
    },
    {
      name: "PiGHOBank",
      abi: PiGHOBankABI as Abi,
    },
  ],
  plugins: [react()],
});
