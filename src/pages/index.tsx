import React, { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { useDepositsContext } from "contexts/DepositsContext";
import Spinner from "components/Spinner";
import { CreateDepositModal } from "components/CreateDepositModal";
import { formatGHOAmount, getWithdrawableAmount } from "utils";

const Home = () => {
  const { address } = useAccount();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [withdrawIndex, setWithdrawIndex] = useState<number | null>(null);
  const [emergencyIndex, setEmergencyIndex] = useState<number | null>(null);
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
    return <Spinner />;
  }

  if (deposits.length === 0) {
    return (
      <div
        className={
          "flex flex-col gap-12 justify-center items-center sm:pt-12 lg:mt-48"
        }
      >
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
      </div>
    );
  }

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
                {formatGHOAmount(getWithdrawableAmount(deposit))} GHO
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
                onClick={() => setWithdrawIndex(index)}
                className="px-3 py-2 text-sm font-medium text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Withdraw
              </button>
              <button
                type="button"
                onClick={() => setEmergencyIndex(index)}
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

      <div
        id="withdraw-modal"
        className={
          withdrawIndex !== null
            ? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            : "hidden"
        }
        onClick={() => setWithdrawIndex(null)}
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
                    Available amount: 100 GHO.
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Amount to withdraw"
                    required
                  />
                </div>
                <button
                  type="button"
                  className="px-6 py-3.5 text-base font-medium text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br
                 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="emergency-modal"
        className={
          emergencyIndex !== null
            ? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            : "hidden"
        }
        onClick={() => setEmergencyIndex(null)}
      >
        <div className="inset-0 p-4 w-full  max-w-md max-h-full">
          <div
            className={
              "bg-gray-800/50 absolute inset-0 backdrop-blur-sm justify-center items-center flex"
            }
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={"pgo-modal text-black"}
            >
              <div>
                To increase your available amount to withdraw, please send this
                link to your emergency contact and ask them to enter the amount
                you need:
                <br />
                <div className={"flex mt-4 items-center gap-2"}>
                  <div className={""}>
                    {`${window.location.origin}/release/${address}/${emergencyIndex}`.substring(
                      0,
                      46
                    )}
                    ...
                  </div>
                  <button
                    type="button"
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 0 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
