import React from "react";
import { useAccount } from "wagmi";

const Home = () => {
  const { address } = useAccount();
  if (!address) {
    return <div className="flex flex-wrap">Connect your wallet</div>;
  }
  return (
    <div>
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
          <button className="mx-2 btn-primary">
            Copy emergency withdraw allowance url
          </button>
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
          <button className="mx-2 btn-primary">
            Copy emergency withdraw allowance url
          </button>
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
          <input type="text" placeholder="Emergency contact address" /> Wallet
          of someone who can let you get more money for emergency cases
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
          amount: 100 GHO.
          <br />
          <button className="mx-2 btn-primary">Withdraw</button>
        </div>
      </div>
      <hr />
      <div>
        Emergency allowance form:
        <br />
        <div>
          <input type="text" placeholder="Amount to withdraw" /> Amount of funds
          you want the depositor to be able to withdraw more than their
          available amount
          <br />
          <button className="mx-2 btn-primary">Release funds</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
