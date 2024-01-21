import React from "react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";

const Release = () => {
  const { address } = useAccount();

  const savingAccount = {
    depositAmount: 1000,
    withdrawnAmount: 500,
    availableToWithdrawAmount: 450,
    periods: 12,
    startTime: new Date(),
  };

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

  return (
    <div className={"flex flex-col gap-12 justify-center items-center"}>
      <h2 className={"text-ش2xl font-bold "}>Saving account details:</h2>
      <div className={"flex gap-4 flex-col justify-center "}>
        <div className="flex text-xs">
          <div className="mx-2">Deposit amount</div>
          <div className="mx-2">Withdrawn amount</div>
          <div className="mx-2">Available to withdraw</div>
          <div className="mx-2">Periods</div>
          <div className="mx-2">Start Time</div>
        </div>
        <div
          className={
            "flex gap-4 flex items-center sa-card py-4 px-4 rounded-lg"
          }
        >
          <div className="mx-2">{savingAccount.depositAmount} GHO</div>
          <div className="mx-2">{savingAccount.withdrawnAmount} GHO</div>
          <div className="mx-2 w-28">
            {savingAccount.availableToWithdrawAmount} GHO
          </div>
          <div className="mx-2">{savingAccount.periods}</div>
          <div className="mx-2">{savingAccount.startTime.toLocaleString()}</div>
        </div>
      </div>

      <div className={"pgo-modal flex flex-col gap-6"}>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter the additional amount that you want the depositor to be able to
          withdraw
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Amount"
          required
        />
        <button
          type="button"
          className="px-6 py-3.5 text-base font-medium text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br
                focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Release lock for 10 GHO
        </button>
      </div>
    </div>
  );
};

export default Release;
