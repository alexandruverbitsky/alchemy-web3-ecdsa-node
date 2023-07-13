import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState();


  return (
    <div className="app">
      <Wallet
        accounts={accounts}
        setAccounts={setAccounts}
        account={account}
        setAccount={setAccount}
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} account={account} />
    </div>
  );
}

export default App;
