import React from "react";
import Home from "pages";
import { Route, Routes } from "react-router-dom";
import { ConnectKitButton } from "connectkit";

function Header() {
  return (
    <header className="flex justify-between items-center flex-col sm:flex-row p-4 bg-gray-800 text-white">
      Pighobank <ConnectKitButton />
    </header>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
