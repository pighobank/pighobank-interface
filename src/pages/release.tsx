import React, { useCallback, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import useDeposits from "hooks/useDeposits";
import { useParams } from "react-router-dom";
import { Address } from "viem";
import Spinner from "components/Spinner";
import { formatGHOAmount, getWithdrawableAmount, parseGHOAmount } from "utils";
import { TransactionState } from "types/transaction";
import { useContractAddress } from "hooks/useContractAddress";
import { PIGHOBANK_CONTRACT_ADDRESS_MAP } from "constants/addresses";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { piGhoBankABI } from "abis/types/generated";

const Release = () => {
  const { address } = useAccount();

  const params = useParams();
  const depositor = params["depositor"] as Address | undefined;
  const index = Number(params["index"]);
  const { deposits } = useDeposits(depositor);
  const deposit = useMemo(() => deposits?.[index], [deposits, index]);

  const releasableAmount = useMemo(() => {
    const withdrawableAmount = getWithdrawableAmount(deposit);
    if (withdrawableAmount === undefined || deposit === undefined)
      return undefined;
    return deposit.amount - withdrawableAmount;
  }, [deposit]);

  const [amount, setAmount] = useState("");
  const amountParsed = useMemo(() => parseGHOAmount(amount), [amount]);

  const [txState, setTxState] = useState(TransactionState.INITIAL);

  const piGHOBankContractAddress = useContractAddress(
    PIGHOBANK_CONTRACT_ADDRESS_MAP
  );
  const release = useCallback(async () => {
    if (
      txState !== TransactionState.INITIAL ||
      !piGHOBankContractAddress ||
      !address ||
      !depositor ||
      !deposit ||
      !amountParsed
    )
      return;
    setTxState(TransactionState.PREPARING_TRANSACTION);
    try {
      const { request } = await prepareWriteContract({
        address: piGHOBankContractAddress,
        abi: piGhoBankABI,
        functionName: "emergencyRelease",
        args: [depositor, BigInt(index), amountParsed],
      });
      setTxState(TransactionState.AWAITING_USER_CONFIRMATION);
      const { hash } = await writeContract(request);
      setTxState(TransactionState.AWAITING_TRANSACTION);
      await waitForTransaction({
        hash,
      });
      setAmount("");
      alert(
        "Funds released successfully! Now the depositor can withdraw their funds"
      );
    } catch (err) {
      alert(String(err));
      throw err;
    } finally {
      setTxState(TransactionState.INITIAL);
    }
  }, [
    address,
    amountParsed,
    deposit,
    depositor,
    index,
    piGHOBankContractAddress,
    txState,
  ]);

  const disabled = useMemo(
    () =>
      txState !== TransactionState.INITIAL ||
      !amountParsed ||
      !releasableAmount ||
      amountParsed > releasableAmount,
    [amountParsed, txState, releasableAmount]
  );
  const buttonText = useMemo(() => {
    if (amountParsed && releasableAmount && amountParsed > releasableAmount)
      return "Invalid Amount";
    if (txState === TransactionState.AWAITING_USER_CONFIRMATION)
      return "Waiting for user approval...";
    if (txState === TransactionState.AWAITING_TRANSACTION)
      return "Sending transaction...";
    if (!amountParsed) return "Enter Amount";
    return "Release lock for " + amount + " GHO";
  }, [amount, amountParsed, txState, releasableAmount]);

  if (!address) {
    return (
      <div className="flex flex-col justify-center items-center">
        <img src={"/img/piggy.png"} className={"opacity-90 w-64"} alt="logo" />
        <h1 className={"font-medium text-[84px] tracking-wide"}>
          PI<span className={"typog text-7xl"}>GHO</span>BANK
        </h1>
        <ConnectKitButton
          customTheme={{
            "--ck-font-family": '"Rubik", sans-serif;',
          }}
        />
      </div>
    );
  }

  if (deposits === undefined) return <Spinner />;
  if (!deposit) return <div>Deposit not found</div>;
  // if (deposit.emergencyReleaseSigner !== address)
  //   return <div>You are not the emergency signer</div>;

  return (
    <div className={"flex flex-col gap-12 justify-center items-center"}>
      <h2 className={"text-2xl font-bold "}>Your Saving Accounts</h2>
      <div className={"flex gap-4 flex-col justify-center "}>
        <div className="flex text-xs">
          <div className="pl-2 mx-2 w-32">Deposit amount</div>
          <div className="mx-2 w-32">Withdrawn amount</div>
          <div className="mx-2 w-32">Available to withdraw</div>
          <div className="mx-2 w-20">Periods</div>
          <div className="mx-2 w-32">Start Time</div>
        </div>
        <div
          className={
            "flex gap-4 flex-col items-center sa-card py-4 px-4 rounded-lg"
          }
        >
          <div className={"flex w-full justify-between"}>
            <div className="mx-2 w-28">
              {formatGHOAmount(deposit.amount)} GHO
            </div>
            <div className="mx-2 w-32">
              {formatGHOAmount(deposit.withdrawnAmount)} GHO
            </div>
            <div className="mx-2 w-32">
              {formatGHOAmount(getWithdrawableAmount(deposit), 18)} GHO
            </div>
            <div className="mx-2 w-20">{String(deposit.periods)}</div>
            <div className="mx-2 ">
              {new Date(
                Number(deposit.depositTimestamp) * 1000
              ).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          "pgo-modal flex flex-col gap-6 rounded-xl p-12 max-w-xl min-w-[400px]"
        }
      >
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter the additional amount that you want the depositor to be able to
          withdraw. Remaining amount to release:{" "}
          {formatGHOAmount(releasableAmount)} GHO
        </label>
        <input
          type="text"
          id="first_name"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Amount"
          required
        />
        <button
          type="button"
          className="px-6 py-3.5 text-base font-medium text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br
                focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => {
            if (!disabled) release();
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Release;
