import React from "react";
import Home from "pages";
import { Route, Routes } from "react-router-dom";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Release from "pages/release";

function Header() {
  const { address } = useAccount();
  return (
    <header
      className={`flex ${
        address ? "justify-between" : "justify-end"
      } items-center flex-col sm:flex-row p-4 text-white`}
    >
      {address && (
        <div className={"flex items-center gap-2"}>
          <img src={"/img/piggy.png"} className={"opacity-90 w-14"} />
          <h1 className={"pt-2 font-medium text-3xl tracking-wide"}>
            PI<span className={"typog text-2xl"}>GHO</span>BANK
          </h1>
        </div>
      )}
      <ConnectKitButton />
    </header>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow  h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/release/:depositor/:index" element={<Release />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
