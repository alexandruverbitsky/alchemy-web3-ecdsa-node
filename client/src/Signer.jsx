import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { hexToBytes, toHex } from "ethereum-cryptography/utils";


/**
 * Hash a message using KECCAK-256
 * @param message the message to hash.
 * @returns the hash of the message.
 */
function hashMsg(msg) { return keccak256(Uint8Array.from(msg)) };

/**
 * Sign message with provided private key and return signature 
 * @param privKey the private key to sign message.
 * @param msg the message to sign.
 * @returns signature in hex format.
 */
async function sign(privKey, msg) {
    const msgHash = hashMsg(msg);
    const [signature, recoveryBit] = await secp.sign(msgHash, privKey, {
        recovered: true,
    });
    const fullSignature = new Uint8Array([recoveryBit, ...signature]);
    return toHex(fullSignature);
}

export { sign };