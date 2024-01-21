import { Deposit } from "types";
import { useAccount } from "wagmi";
import React, { useMemo } from "react";
import { copyToClipboard } from "utils/copyToClipboard";

export function EmergencyWithdrawModal({
  emergencyDepositItem,
  setEmergencyDepositItem,
}: {
  emergencyDepositItem: Deposit | null;
  setEmergencyDepositItem: (value: Deposit | null) => void;
}) {
  const { address } = useAccount();
  const emergencyReleaseUrl = useMemo(
    () =>
      `${window.location.origin}/release/${address}/${emergencyDepositItem?.index}`,
    [address, emergencyDepositItem]
  );
  return (
    <div
      id="emergency-modal"
      className={
        emergencyDepositItem !== null
          ? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          : "hidden"
      }
      onClick={() => setEmergencyDepositItem(null)}
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
              <div className={"mt-4"}>
                <div className="break-all">{emergencyReleaseUrl}</div>
                <button
                  onClick={() => {
                    copyToClipboard(emergencyReleaseUrl);
                    alert("Copied to Clipboard!");
                  }}
                  type="button"
                  className="py-2.5 px-5 me-2 mt-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 0 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
