/**
 * This script is used to generate private/public key pairs,
 * in order to initialize user wallets on the client side and
 * user address on the server side.
 */

const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);

function generateEthAddress(publicKey) {
    return keccak256(publicKey.slice(1)).slice(-20)
}

console.log(`privateKey: ${toHex(privateKey)}`)
console.log(`publicKey: ${toHex(publicKey)}`)
console.log(`address: ${toHex(generateEthAddress(publicKey))}`)