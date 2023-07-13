import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, hexToBytes } from "ethereum-cryptography/utils"

/**
 * Generate random private key
 * @returns private kye in Uint8Array;
 */
function generatePrivateKey() {
  return secp.utils.randomPrivateKey();
}

/**
 * Generate public key for a private key
 * @param privKey: Uint8Array
 * @returns private kye in Uint8Array;
 */
function generatePublicKey(privKey) {
  return secp.getPublicKey(privKey);
}

/**
 * Generate eth address from a public key
 * @param pubKey: Uint8Array
 * @returns address: Uint8Array;
 */
function generateEthAddress(pubKey) {
  return keccak256(pubKey.slice(1)).slice(-20)
}


/**
 * Create new wallet account by generetic new random private key, and retrieve public and eth address 
 * @param name: String
 * @returns account
 */
function createAccount(name) {
  const privKey = generatePrivateKey();
  const pubKey = generatePublicKey(privKey);
  const addres = generateEthAddress(pubKey)

  return {
    name,
    'privKey': `${toHex(privKey)}`,
    'pubKey': `${toHex(pubKey)}`,
    'address': `${toHex(addres)}`,
  }
}

/**
 * Create wallet account from a private key, and retrieve public and eth address 
 * @param name: String
 * @returns account
 */
function importAccount(name, privKey) {
  const pubKey = generatePublicKey(hexToBytes(privKey));
  const addres = generateEthAddress(pubKey)

  return {
    name,
    'privKey': `${privKey}`,
    'pubKey': `${toHex(pubKey)}`,
    'address': `${toHex(addres)}`,
  }
}


export { createAccount, importAccount };