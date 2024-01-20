import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";

type AccountType = {
  depositAmount: number;
  withdrawnAmount: number;
  penaltyAmount: number;
  availableToWithdrawAmount: number;
  periods: number;
  startTime: Date;
}

const Home = () => {
  const { address } = useAccount();
  const [dummyFlag, setDummyFlag] = useState(true);
  const [savingAccounts, setSavingAccounts] = useState<AccountType[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(dummyFlag) {
      setSavingAccounts([ {
        depositAmount: 1000,
        withdrawnAmount: 500,
        penaltyAmount: 50,
        availableToWithdrawAmount: 450,
        periods: 12,
        startTime: new Date()
      }, {
        depositAmount: 1000,
        withdrawnAmount: 500,
        penaltyAmount: 50,
        availableToWithdrawAmount: 450,
        periods: 12,
        startTime: new Date()
      }, {
        depositAmount: 1000,
        withdrawnAmount: 500,
        penaltyAmount: 50,
        availableToWithdrawAmount: 450,
        periods: 12,
        startTime: new Date()
      } ] as AccountType[]);
    } else {
      setSavingAccounts([]);
    }
  }, [dummyFlag]);

  if (!address) {
    return (
      <div className="flex flex-col justify-center items-center">
        <img src={'/img/piggy.png'} className={'opacity-90 w-64'}/>
        <h1 className={'font-medium text-[84px] tracking-wide'}>PI<span className={'typog text-7xl'}>GHO</span>BANK</h1>
        <ConnectKitButton customTheme={{
          "--ck-font-family": '"Rubik", sans-serif;',
        }}/>
      </div>);
  }

  if (savingAccounts.length === 0) {
    return <div className={'flex flex-col gap-12 justify-center items-center sm:pt-12 lg:pt-48'}>You don't have any saving accounts.
      <button type="button"
              onClick={() => setShowModal(true)}
              className="px-6 py-3.5 text-base font-medium text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br
                focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add New Account
      </button>
    </div>;
  }

  return (
    <div className={'flex flex-col gap-12 justify-center items-center'}>
      <h2 className={'text-2xl font-bold '}>Your saving accounts:</h2>
      <div className={'flex gap-4 flex-col justify-center '}>
        {savingAccounts.map((account: AccountType, index: number) => (
          <div key={index} className={'flex gap-4 bg-gray-800 border-2 shadow-inner py-4 px-4  rounded-lg'}>
            <div className="mx-2">{account.depositAmount}</div>
            <div className="mx-2">{account.withdrawnAmount}</div>
            <div className="mx-2">{account.penaltyAmount}</div>
            <div className="mx-2">{account.availableToWithdrawAmount}</div>
            <div className="mx-2">{account.periods}</div>
            <div className="mx-2">{account.startTime.toString()}</div>
          </div>
        ))}</div>

        <button type="button"
                onClick={() => setShowModal(true)}
                className="px-6 py-3.5 text-base font-medium text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br
                focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add New Account
        </button>

        <div id="authentication-modal"
             className={showModal ? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" : "hidden"}
             onClick={() => setShowModal(false)}>
          <div className="inset-0 p-4 w-full  max-w-md max-h-full">

            <div className={'bg-gray-800/50 absolute inset-0   backdrop-blur-sm justify-center items-center flex'}>
              <div className={'bg-yellow-100 rounded-xl text-black p-12'}>
                <div>
                  <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                    name</label>
                  <input type="text" id="first_name"
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="John" required/>
                </div>
              </div>
            </div>

          </div>
        </div>
    </div>
  );
};

export default Home;