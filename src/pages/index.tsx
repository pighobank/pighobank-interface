import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";

type AccountType = {
  depositAmount: number;
  withdrawnAmount: number;
  availableToWithdrawAmount: number;
  periods: number;
  startTime: Date;
};

const Home = () => {
  const { address } = useAccount();
  const dummyFlag = true;
  const [savingAccounts, setSavingAccounts] = useState<AccountType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [withdrawIndex, setWithdrawIndex] = useState<number | null>(null);
  const [emergencyIndex, setEmergencyIndex] = useState<number | null>(null);

  useEffect(() => {
    if (dummyFlag) {
      setSavingAccounts([
        {
          depositAmount: 1000,
          withdrawnAmount: 500,
          availableToWithdrawAmount: 450,
          periods: 12,
          startTime: new Date(),
        },
        {
          depositAmount: 1000,
          withdrawnAmount: 500,
          availableToWithdrawAmount: 450,
          periods: 12,
          startTime: new Date(),
        },
        {
          depositAmount: 1000,
          withdrawnAmount: 500,
          availableToWithdrawAmount: 450,
          periods: 12,
          startTime: new Date(),
        },
      ] as AccountType[]);
    } else {
      setSavingAccounts([]);
    }
  }, [dummyFlag]);

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

  if (savingAccounts.length === 0) {
    return (
      <div
        className={
          "flex flex-col gap-12 justify-center items-center sm:pt-12 lg:mt-48"
        }
      >
        You don't have any saving accounts.
        <button
          type="button"
          onClick={() => setShowModal(true)}
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
      <h2 className={"text-2xl font-bold "}>Your saving accounts:</h2>
      <div className={"flex gap-4 flex-col justify-center "}>
        <div className="flex text-xs">
          <div className="pl-2 mx-2 w-32">Deposit amount</div>
          <div className="mx-2 w-32">Withdrawn amount</div>
          <div className="mx-2 w-32">Available to withdraw</div>
          <div className="mx-2 w-20">Periods</div>
          <div className="mx-2 w-32">Start Time</div>
        </div>
        {savingAccounts.map((account, index) => (
          <div
            key={index}
            className={
              "flex gap-4 flex-col items-center sa-card py-4 px-4 rounded-lg"
            }
          >
            <div className={'flex w-full justify-between'}>
            <div className="mx-2 w-28">{account.depositAmount} GHO</div>
            <div className="mx-2 w-32">{account.withdrawnAmount} GHO</div>
            <div className="mx-2 w-32">{account.availableToWithdrawAmount} GHO</div>
            <div className="mx-2 w-20">{account.periods}</div>
            <div className="mx-2 ">{account.startTime.toLocaleString()}</div>
            </div>
            <div className={'flex gap-4 w-full justify-end'}>
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
        onClick={() => setShowModal(true)}
        className="px-6 py-3.5 text-base font-medium text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br
                 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Add New Account
      </button>

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
                  How much do you want to deposit? <span className={'text-gray-600 font-normal'}>Balance: 100 GHO</span>
                </label>
                <input
                  type="text"
                  id="amount"
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
                  In how many periods would you like to withdraw your funds?
                  Each period is 30 days. The first withdrawal period starts 30
                  days after the deposit
                </label>
                <input
                  type="text"
                  id="periods"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Deposit amount"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Emergency contact address"
                  required
                />
              </div>
              <button
                type="button"
                className="px-6 py-3.5 text-base font-medium text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br
                 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Create deposit
              </button>
            </div>
          </div>
        </div>
      </div>

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
            <div
              onClick={(e) => e.stopPropagation()}
              className={"pgo-modal"}
            >
              <div className={'flex flex-col gap-6'}>
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
                /> </div>
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
                <div className={'flex mt-4 items-center gap-2'}>
                  <div className={''}>{`${window.location.origin}/release/${address}/${emergencyIndex}`.substring(0, 46)}...</div>
                  <button type="button"
                          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 0 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">copy
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
