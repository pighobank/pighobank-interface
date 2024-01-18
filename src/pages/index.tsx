import React from "react";
import { useAccount } from "wagmi";

const Home = () => {
  const { address } = useAccount();
  if (!address) {
    return <div className="flex flex-wrap">Connect your wallet</div>;
  }
  return (
    <div>
      <div className="border-2 border-red-500 p-5">
        Penalties to claim: 10 GHO
        <br />
        <br />
        To claim your penalties, you should create a deposit of at least 10 GHO
        into a saving account. Your penalty amount will be added to your saving
        deposit <br />
      </div>
      <br />
      <button className="mx-2 btn-primary">Create saving account</button>
      <br />
      <br />
      Your saving accounts:
      <br />
      <br />
      <div>
        <div className="flex">
          <div className="mx-2">Deposit amount</div>
          <div className="mx-2">Withdrawn amount</div>
          <div className="mx-2">Penalty amount</div>
          <div className="mx-2">Available to withdraw amount</div>
          <div className="mx-2">Periods</div>
          <div className="mx-2">Start Time</div>
        </div>
        <div className="flex my-2">
          <div className="mx-2">200 GHO</div>
          <div className="mx-2">50 GHO</div>
          <div className="mx-2">10 GHO</div>
          <div className="mx-2">100 GHO</div>
          <div className="mx-2">6</div>
          <div className="mx-2">2024/01/10 12:52</div>
          <button className="mx-2 btn-primary">Add funds?</button>
          <button className="mx-2 btn-primary">Withdraw</button>
        </div>
        <div className="flex my-2">
          <div className="mx-2">200 GHO</div>
          <div className="mx-2">50 GHO</div>
          <div className="mx-2">10 GHO</div>
          <div className="mx-2">100 GHO</div>
          <div className="mx-2">6</div>
          <div className="mx-2">2024/01/10 12:52</div>
          <button className="mx-2 btn-primary">Add funds?</button>
          <button className="mx-2 btn-primary">Withdraw</button>
        </div>
      </div>
      <hr />
      <div>
        Create saving form: (Can be also used for add funds form)
        <br />
        <div>
          <input type="text" placeholder="Enter periods" /> Each period is 30
          days
          <br />
          <input type="text" placeholder="Enter deposit amount" /> GHO
          <br />
          <button className="mx-2 btn-primary">Create saving account</button>
        </div>
      </div>
      <hr />
      <div>
        Withdraw form:
        <br />
        <div>
          <input type="text" placeholder="Amount to withdraw" /> Available
          amount: 100 GHO. if you withdraw more than 90% of your available
          amount, 10% of the amount to withdraw from your remaining periods will
          be deducted as a penalty and can be claimed by you later if you
          deposit more funds into active saving accounts
          <br />
          <button className="mx-2 btn-primary">Withdraw</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
