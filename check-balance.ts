import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

async function main() {
  const supliedPublicKey = process.argv[2];

  if (!supliedPublicKey) {
    throw new Error("Provide a public key to check the balance of!");
  }

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  let publicKey;

  try {
    publicKey = new PublicKey(supliedPublicKey);
  } catch (error) {
    console.log("Invalid wallet address");
  }

  // const publicKey = new PublicKey("Ccp5wVTvxBCDVRXwLXJdfCA9CxtCiDZV3GDxtheLVtMy");

  try {
    const balanceInLamports = await connection.getBalance(publicKey);

    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(
      `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
    );
  } catch (error) {
    console.error(
      "Failed to retrieve the balance. Please check the wallet address and try again."
    );
  }
}

main().catch((err) => {
  console.error(err);
});
