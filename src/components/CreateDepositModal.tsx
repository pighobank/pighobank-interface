import React, { useCallback, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { formatGHOAmount, parseGHOAmount } from "utils";
import { TransactionState } from "types/transaction";
import { useContractAddress } from "hooks/useContractAddress";
import {
  GHO_ADDRESS_MAP,
  PIGHOBANK_CONTRACT_ADDRESS_MAP,
} from "constants/addresses";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { piGhoBankABI, useErc20BalanceOf } from "abis/types/generated";
import { useErc20Approval } from "hooks/useErc20Approval";
import { ApprovalState } from "types/approval";
import { Address } from "viem";

export function CreateDepositModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}) {
  const { address } = useAccount();
  const GHOAddress = useContractAddress(GHO_ADDRESS_MAP);
  const { data: GHOBalance } = useErc20BalanceOf({
    address: GHOAddress,
    args: address ? [address] : undefined,
  });

  const piGHOBankContractAddress = useContractAddress(
    PIGHOBANK_CONTRACT_ADDRESS_MAP
  );

  const [amount, setAmount] = useState("");
  const amountParsed = useMemo(() => parseGHOAmount(amount), [amount]);
  const { approve, approvalState } = useErc20Approval({
    amount: amountParsed,
    spender: piGHOBankContractAddress,
    tokenAddress: GHOAddress,
  });

  const [periods, setPeriods] = useState("");
  const [emergencySignerAddress, setEmergencySignerAddress] = useState("");

  const [txState, setTxState] = useState(TransactionState.INITIAL);

  const deposit = useCallback(async () => {
    if (approvalState === ApprovalState.NOT_APPROVED) {
      approve();
    }
    console.log({
      approvalState,
      txState,
      piGHOBankContractAddress,
      address,
      amountParsed,
      periods,
      emergencySignerAddress,
    });
    if (
      approvalState !== ApprovalState.APPROVED ||
      txState !== TransactionState.INITIAL ||
      !piGHOBankContractAddress ||
      !address ||
      !amountParsed ||
      !periods ||
      !emergencySignerAddress
    )
      return;
    setTxState(TransactionState.PREPARING_TRANSACTION);
    try {
      const { request } = await prepareWriteContract({
        address: piGHOBankContractAddress,
        abi: piGhoBankABI,
        functionName: "createDeposit",
        args: [
          amountParsed,
          emergencySignerAddress as Address,
          BigInt(periods),
        ],
      });
      setTxState(TransactionState.AWAITING_USER_CONFIRMATION);
      const { hash } = await writeContract(request);
      setTxState(TransactionState.AWAITING_TRANSACTION);
      await waitForTransaction({
        hash,
      });
      setAmount("");
      alert("Deposited Successfully!");
      setShowModal(false);
    } catch (err) {
      alert(String(err));
      throw err;
    } finally {
      setTxState(TransactionState.INITIAL);
    }
  }, [
    address,
    amountParsed,
    approvalState,
    approve,
    emergencySignerAddress,
    periods,
    piGHOBankContractAddress,
    setShowModal,
    txState,
  ]);

  const disabled = useMemo(
    () =>
      (approvalState !== ApprovalState.APPROVED &&
        approvalState !== ApprovalState.NOT_APPROVED) ||
      txState !== TransactionState.INITIAL ||
      !amountParsed ||
      !GHOBalance ||
      amountParsed > GHOBalance,
    [approvalState, txState, amountParsed, GHOBalance]
  );
  const buttonText = useMemo(() => {
    if (amountParsed && GHOBalance && amountParsed > GHOBalance)
      return "Insufficient Balance";

    if (txState === TransactionState.AWAITING_USER_CONFIRMATION)
      return "Waiting for user approval...";
    if (txState === TransactionState.AWAITING_TRANSACTION)
      return "Sending transaction...";

    if (approvalState === ApprovalState.NOT_APPROVED) return "Approve";
    if (approvalState === ApprovalState.AWAITING_USER_CONFIRMATION)
      return "Waiting for user approval...";
    if (approvalState === ApprovalState.AWAITING_TRANSACTION)
      return "Sending approval transaction...";

    return "Deposit";
  }, [GHOBalance, amountParsed, approvalState, txState]);

  return (
    <div
      id="create-modal"
      className={
        showModal
          ? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          : "hidden"
      }
      onClick={() => setShowModal(false)}
    >
      <div className="inset-0 p-4 w-full  max-w-md max-h-full">
        <div
          className={
            "bg-gray-800/50 absolute inset-0 backdrop-blur-sm justify-center items-center flex"
          }
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={"pgo-modal flex flex-col gap-6"}
          >
            <div>
              <label
                htmlFor="amount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-between"
              >
                How much do you want to deposit?{" "}
                <span className={"text-gray-600 font-normal"}>
                  Balance: {formatGHOAmount(GHOBalance)} GHO
                </span>
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Deposit amount"
                required
              />
            </div>
            <div>
              <label
                htmlFor="periods"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                In how many periods would you like to withdraw your funds? Each
                period is 30 days. The first withdrawal period starts 30 days
                after the deposit
              </label>
              <input
                type="number"
                id="periods"
                value={periods}
                onChange={(e) => setPeriods(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Periods"
                required
              />
            </div>
            <div>
              <label
                htmlFor="periodsemergency"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Wallet of someone who can let you get more money for emergency
                cases
              </label>
              <input
                type="text"
                id="emergency"
                value={emergencySignerAddress}
                onChange={(e) => setEmergencySignerAddress(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Emergency contact address"
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
                if (!disabled) deposit();
              }}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
