import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as tokenJson from "../../artifacts/contracts/Token.sol/TweeterCoin.json";
// eslint-disable-next-line node/no-missing-import
import { TweeterCoin } from "../../typechain";
import { connectToWallet } from "../utils";

/**
 * > delegateVote <ballotContractAddress> <delegateWalletAddress>
 * 
 * Delegate your vote to another wallet.
 */
async function main() {
  // Get inputs
  if (process.argv.length < 3) throw new Error("Token address missing");
  const tokenAddress = process.argv[2];
  if (process.argv.length < 4) throw new Error("Delegatee wallet address missing");
  const delegateeWalletAddress = process.argv[3];

  console.log(
    `Attaching token contract interface to tokenAddress=${tokenAddress}`
  );

  // Connect to wallet
  const { wallet, signer } = await connectToWallet();

  // Connect to contract
  const tokenContract: TweeterCoin = new Contract(
    tokenAddress,
    tokenJson.abi,
    signer
  ) as TweeterCoin;

  // Process mint
  console.log(`Processing delgation from walletAddr=${wallet.getAddress()} to delegateeWalletAddress=${delegateeWalletAddress} tokenAddress=${tokenAddress}`);
  const tx = await tokenContract.delegate(delegateeWalletAddress);
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
