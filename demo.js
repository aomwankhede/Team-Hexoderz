const bitcoin = require('bitcoinjs-lib');

// Bitcoin transaction data
const txData = {
  txid: '...',
  vout: 0,
  value: 10000000, // in satoshis (0.1 BTC)
  scriptPubKey: 'OP_DUP OP_HASH160 a7db6b8ee... OP_EQUALVERIFY OP_CHECKSIG',
};

// Public key
const publicKeyHex = '1234';

// Validate transaction
const publicKey = Buffer.from(publicKeyHex, 'hex');
const scriptPubKey = bitcoin.address.toOutputScript(bitcoin.address.fromBase58Check('1address...').address);
const redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(bitcoin.crypto.hash160(publicKey));
const witnessScript = bitcoin.script.compile([redeemScript, bitcoin.opcodes.OP_CHECKSIG]);
const witness = bitcoin.script.witness.compile([Buffer.from(''), publicKey]);

const result = bitcoin.script.witness.verify(witness, witnessScript, txData.scriptPubKey, txData.value);

if (result) {
  console.log('Transaction is valid!');
} else {
  console.log('Transaction is not valid!');
}