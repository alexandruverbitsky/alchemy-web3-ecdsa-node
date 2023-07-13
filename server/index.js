const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const utils = require("./cryptography/utils");
const { hexToBytes, toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());


const balances = {
  // use to import into wallet
  //privKey: 6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e
  // pubKey: 04385c3a6ec0b9d57a4330dbd6284989be5bd00e41c535f9ca39b6ae7c521b81cd2443fef29e7f34aa8c8002eceaff422cd1f622bb4830714110e736044d8f084f
  '16BB6031CBF3A12B899AB99D96B64B7BBD719705': 100, 
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address.toUpperCase()] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  const { message, signature } = req.body;
  console.log(JSON.stringify(message));
  const { amount } = message;
  const recipient = message.recipient.toUpperCase();

   // Get public key and sender
   const pubKey = utils.signatureToPubKey(message, signature);
   console.log(toHex(pubKey));
   const sender = toHex(utils.pubKeyToAddress(pubKey)).toString().toUpperCase();
   console.log(`${sender}`);
  

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    console.log(balances[sender]);
    console.log(amount);
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
