import React, { createContext, ReactNode, useContext } from "react";
import useDeposits from "hooks/useDeposits";
import { useAccount } from "wagmi";

// Define the context
const DepositsContext = createContext<ReturnType<typeof useDeposits> | null>(
  null
);

interface ProviderProps {
  children: ReactNode;
}

// Define the Provider component
export const DepositsContextProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const { address } = useAccount();
  const data = useDeposits(address);
  return (
    <DepositsContext.Provider value={data}>{children}</DepositsContext.Provider>
  );
};

export const useDepositsContext = () => {
  const context = useContext(DepositsContext);
  if (context === null) {
    throw new Error(
      "DepositsContext must be used within a DepositsContextProvider"
    );
  }
  return context;
};
