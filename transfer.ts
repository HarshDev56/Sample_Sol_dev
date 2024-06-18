import {Connection,Transaction,SystemProgram,sendAndConfirmTransaction,PublicKey} from '@solana/web3.js';
import "dotenv/config";
import {getKeypairFromEnvironment} from '@solana-developers/helpers';

const suppliedToPubKey = process.argv[2] || null;

if (!suppliedToPubKey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
}

const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`Supplied public key : ${suppliedToPubKey}`);

const toPubkey = new PublicKey(suppliedToPubKey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
  );

  const transaction = new Transaction();

  const LAMPORTS_TO_SEND = 5000;
  
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey:senderKeyPair.publicKey,
    toPubkey:toPubkey,
    lamports:LAMPORTS_TO_SEND
  })

  transaction.add(sendSolInstruction);

  const signature = await sendAndConfirmTransaction(connection,transaction,[
    senderKeyPair
  ]);

  console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
  );

  console.log(`Transaction signature is ${signature}!`);
  