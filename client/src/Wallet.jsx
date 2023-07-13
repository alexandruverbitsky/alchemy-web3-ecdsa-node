import React, { useState } from 'react';
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { createAccount, importAccount } from './Account';
import { toHex } from "ethereum-cryptography/utils"

function Wallet({ accounts, setAccounts, account, setAccount, address, setAddress, balance, setBalance }) {

  const [showPopup, setShowPopup] = useState(false);
  const [showImportPopup, setShowImportPopup] = useState(false);
  const [privKey, setPrivKey] = useState('');
  const [pubKey, setPubKey] = useState('');

  async function onSelectAccount(evt) {
    const selectedAccount = JSON.parse(evt.target.value);
    setAccount(selectedAccount);

    if (selectedAccount) {
      const {
        data: { balance },
      } = await server.get(`balance/${selectedAccount.address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  function onCreateNewAccount() {
    const newAccount = createAccount(`Account-${accounts.length + 1}`);
    setAccounts([...accounts, newAccount]); // Add new account to the accounts list
    setShowPopup(true);
  }

  function onImportAccount() {
    const newImportAccount = importAccount(`Account-${accounts.length + 1}`, privKey);
    setAccounts([...accounts, newImportAccount]);
    setPrivKey('');
    setShowImportPopup(false);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <select onChange={onSelectAccount} value={JSON.stringify(account)}>
        <option value="">-----Select Account------</option>
        {accounts.map((acc, index) => (
          <option key={index} value={JSON.stringify(acc)}>
            {acc.name} /  {`${acc.address.slice(0, 5)}...${acc.address.slice(-5)}`}
          </option>
        ))}
      </select>

      <div className="balance">Balance: {balance}</div>

      <button className="button" onClick={onCreateNewAccount}>Create New Account</button>

      {showPopup && (
        <div className="popup">
          <h2>New Account Details</h2>
          <p>Backup and store safely the following sensitive information</p>
          <div>
            <pre>{JSON.stringify(accounts, null, 2)}</pre>
          </div>

          <button className="button" onClick={() => setShowPopup(false)}>
            Close
          </button>
        </div>
      )}

      <button className="button" onClick={() => setShowImportPopup(true)}>Import Account</button>
      {showImportPopup && (
        <div className="popup">
          <h2>Import Account</h2>
          <label>
            Private Key
            <input
              placeholder="ef4f0..."
              value={privKey}
              onChange={(evt) => setPrivKey(evt.target.value)}
            ></input>
          </label>

          <button className="button" onClick={onImportAccount}>
            Import
          </button>
        </div>
      )}

    </div>
  );
}

export default Wallet;
