import "index.scss";
import { chains } from "constants/chains";
import * as process from "process";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createConfig, WagmiConfig } from "wagmi";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

if (!process.env.REACT_APP_WALLETCONNECT_PROJECT_ID) {
  throw new Error("REACT_APP_WALLETCONNECT_PROJECT_ID not provided");
}

if (!process.env.REACT_APP_INFURA_API_KEY) {
  throw new Error("REACT_APP_INFURA_API_KEY not provided");
}

const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: "Pighobank",
    infuraId: process.env.REACT_APP_INFURA_API_KEY,
    walletConnectProjectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
    chains,
  })
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={wagmiConfig}>
        <ConnectKitProvider theme="retro" >
          <App />
        </ConnectKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
