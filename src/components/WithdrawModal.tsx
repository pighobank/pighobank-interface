import { Deposit } from "types";
import React, { useCallback, useMemo, useState } from "react";
import { formatGHOAmount, getWithdrawableAmount, parseGHOAmount } from "utils";
import { TransactionState } from "types/transaction";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { piGhoBankABI } from "abis/types/generated";
import { useAccount } from "wagmi";
import { useContractAddress } from "hooks/useContractAddress";
import { PIGHOBANK_CONTRACT_ADDRESS_MAP } from "constants/addresses";

export function WithdrawModal({
  withdrawDepositItem,
  setWithdrawDepositItem,
}: {
  withdrawDepositItem: Deposit | null;
  setWithdrawDepositItem: (value: Deposit | null) => void;
}) {
  const { address } = useAccount();
  const withdrawableAmount = useMemo(
    () => getWithdrawableAmount(withdrawDepositItem),
    [withdrawDepositItem]
  );
  const [amount, setAmount] = useState("");
  const amountParsed = useMemo(() => parseGHOAmount(amount), [amount]);

  const [txState, setTxState] = useState(TransactionState.INITIAL);

  const piGHOBankContractAddress = useContractAddress(
    PIGHOBANK_CONTRACT_ADDRESS_MAP
  );
  const withdraw = useCallback(async () => {
    if (
      txState !== TransactionState.INITIAL ||
      !piGHOBankContractAddress ||
      !address ||
      !withdrawDepositItem ||
      !amountParsed
    )
      return;
    setTxState(TransactionState.PREPARING_TRANSACTION);
    try {
      const { request } = await prepareWriteContract({
        address: piGHOBankContractAddress,
        abi: piGhoBankABI,
        functionName: "withdraw",
        args: [BigInt(withdrawDepositItem.index), amountParsed, address],
      });
      setTxState(TransactionState.AWAITING_USER_CONFIRMATION);
      const { hash } = await writeContract(request);
      setTxState(TransactionState.AWAITING_TRANSACTION);
      await waitForTransaction({
        hash,
      });
      setAmount("");
      alert("Withdrawn Successfully!");
      setWithdrawDepositItem(null);
    } catch (err) {
      alert(String(err));
      throw err;
    } finally {
      setTxState(TransactionState.INITIAL);
    }
  }, [
    address,
    amountParsed,
    piGHOBankContractAddress,
    setWithdrawDepositItem,
    txState,
    withdrawDepositItem,
  ]);

  const disabled = useMemo(
    () =>
      txState !== TransactionState.INITIAL ||
      !amountParsed ||
      !withdrawableAmount ||
      amountParsed > withdrawableAmount,
    [amountParsed, txState, withdrawableAmount]
  );
  const buttonText = useMemo(() => {
    if (amountParsed && withdrawableAmount && amountParsed > withdrawableAmount)
      return "Invalid Amount";
    if (txState === TransactionState.AWAITING_USER_CONFIRMATION)
      return "Waiting for user approval...";
    if (txState === TransactionState.AWAITING_TRANSACTION)
      return "Sending transaction...";
    return "Withdraw";
  }, [amountParsed, txState, withdrawableAmount]);

  return (
    <div
      id="withdraw-modal"
      className={
        withdrawDepositItem !== null
          ? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          : "hidden"
      }
      onClick={() => setWithdrawDepositItem(null)}
    >
      <div className="inset-0 p-4 w-full  max-w-md max-h-full">
        <div
          className={
            "bg-gray-800/50 absolute inset-0   backdrop-blur-sm justify-center items-center flex"
          }
        >
          <div onClick={(e) => e.stopPropagation()} className={"pgo-modal"}>
            <div className={"flex flex-col gap-6"}>
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Available amount: {formatGHOAmount(withdrawableAmount, 18)}{" "}
                  GHO.
                </label>
                <input
                  type="number"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Amount to withdraw"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className={`px-6 py-3.5 text-base font-medium text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500
                  shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80
                  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
                    disabled ? "cursor-not-allowed" : "hover:bg-gradient-to-br"
                  }`}
                onClick={() => {
                  if (!disabled) withdraw();
                }}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
