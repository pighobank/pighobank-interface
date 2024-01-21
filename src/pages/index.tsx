import React, { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { useDepositsContext } from "contexts/DepositsContext";
import Spinner from "components/Spinner";
import { CreateDepositModal } from "components/CreateDepositModal";
import { formatGHOAmount, getWithdrawableAmount } from "utils";
import { Deposit } from "types";
import { EmergencyWithdrawModal } from "components/EmergencyWithdrawModal";
import { WithdrawModal } from "components/WithdrawModal";

const Home = () => {
  const { address } = useAccount();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [withdrawDepositItem, setWithdrawDepositItem] =
    useState<Deposit | null>(null);
  const [emergencyDepositItem, setEmergencyDepositItem] =
    useState<Deposit | null>(null);
  const { deposits } = useDepositsContext();

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

  if (deposits === undefined) {
    return <div className={'h-[90vh] flex justify-center items-center'}><Spinner /></div>;
  }

  if (deposits.length === 0) {
    return (
      <div
        className={
          "flex flex-col gap-12 justify-center items-center h-[90vh]"
        }
      >
        <img src={"/img/urban-683.png"} className={"opacity-90 w-[400px] -mb-12"} alt="logo"/>
        You don't have any saving accounts.
        <button
          type="button"
          onClick={() => setShowDepositModal(true)}
          className="px-6 py-3.5 text-base font-medium text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br
                 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add New Account
        </button>
        <CreateDepositModal
          showModal={showDepositModal}
          setShowModal={setShowDepositModal}
        />
      </div>
    );
  }

  return (
    <div className={'flex justify-center pt-24'}>
    <div className={"flex flex-col gap-12 justify-center items-center w-[780px] list-wrappergit py-16"}>
      <h2 className={"text-2xl font-bold "}>Your Saving Accounts</h2>
      <div className={"flex gap-4 flex-col justify-center "}>
        <div className="flex text-xs">
          <div className="pl-2 mx-2 w-32">Deposit amount</div>
          <div className="mx-2 w-32">Withdrawn amount</div>
          <div className="mx-2 w-32">Available to withdraw</div>
          <div className="mx-2 w-20">Periods</div>
          <div className="mx-2 w-32">Start Time</div>
        </div>
        {deposits.map((deposit, index) => (
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
            <div className={"flex gap-4 w-full justify-end"}>
              <button
                type="button"
                onClick={() => setWithdrawDepositItem(deposit)}
                className="px-3 py-2 text-sm font-medium text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Withdraw
              </button>
              <button
                type="button"
                onClick={() => setEmergencyDepositItem(deposit)}
                className="px-3 py-2 text-sm font-medium font-medium text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Emergency withdrawal
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setShowDepositModal(true)}
        className="px-6 py-3.5 text-base font-medium text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br
                 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Add New Account
      </button>

      <CreateDepositModal
        showModal={showDepositModal}
        setShowModal={setShowDepositModal}
      />

      <WithdrawModal
        withdrawDepositItem={withdrawDepositItem}
        setWithdrawDepositItem={setWithdrawDepositItem}
      />

      <EmergencyWithdrawModal
        emergencyDepositItem={emergencyDepositItem}
        setEmergencyDepositItem={setEmergencyDepositItem}
      />
    </div>
    </div>
  );
};

export default Home;
