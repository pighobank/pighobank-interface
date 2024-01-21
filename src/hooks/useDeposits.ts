import { useContractAddress } from "hooks/useContractAddress";
import { PIGHOBANK_CONTRACT_ADDRESS_MAP } from "constants/addresses";
import {
  piGhoBankABI,
  usePiGhoBankGetDepositsCount,
} from "abis/types/generated";
import { useEffect, useState } from "react";
import { multicall } from "@wagmi/core";
import { Deposit } from "types";
import { useAccount, useBlockNumber } from "wagmi";

export default function useDeposits() {
  const piGHOBankContractAddress = useContractAddress(
    PIGHOBANK_CONTRACT_ADDRESS_MAP
  );
  const { address } = useAccount();
  const { data: depositsLength } = usePiGhoBankGetDepositsCount({
    address: piGHOBankContractAddress,
    args: address ? [address] : undefined,
    watch: true,
  });

  const [deposits, setDeposits] = useState<Deposit[] | undefined>(undefined);

  const { data: blockNumber } = useBlockNumber();

  useEffect(() => {
    if (!piGHOBankContractAddress || !address || depositsLength === undefined)
      return;
    if (depositsLength === BigInt(0)) {
      setDeposits([]);
      return;
    }
    const indexes = Array.from(Array(Number(depositsLength)).keys());
    multicall({
      allowFailure: false,
      contracts: indexes.map((index) => ({
        address: piGHOBankContractAddress,
        abi: piGhoBankABI,
        functionName: "deposits",
        args: [address, BigInt(index)],
      })),
    }).then((res) =>
      setDeposits(
        res.map((depositData, index) => ({
          index,
          amount: depositData[0],
          depositTimestamp: depositData[1],
          withdrawnAmount: depositData[2],
          emergencyReleaseSigner: depositData[3],
          emergencyReleaseAmount: depositData[4],
          periods: depositData[5],
        }))
      )
    );
  }, [piGHOBankContractAddress, address, depositsLength, blockNumber]);

  return {
    deposits,
  };
}
