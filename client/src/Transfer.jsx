import { useState } from "react";
import server from "./server";
import { sign } from "./Signer";

function Transfer({ account, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    if (account !== undefined) {
      const message = {
        amount: parseInt(sendAmount),
        recipient,
      };


      const signature = await sign(account.privKey, message);

      const transaction = {
        message,
        signature
      };

      try {
        const {
          data: { balance },
        } = await server.post(`send`, transaction);
        setBalance(balance);
      } catch (ex) {
        alert(ex.response.data.message);
      }
    } else {
      alert('Select an existing account');
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: a9b2704965399853c590a63321a0ec357eaf61e2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
