import React from "react";

export function CreateDepositModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}) {
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
                  Balance: 100 GHO
                </span>
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
                In how many periods would you like to withdraw your funds? Each
                period is 30 days. The first withdrawal period starts 30 days
                after the deposit
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
  );
}
