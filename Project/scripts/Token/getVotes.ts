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
  if (process.argv.length < 4) throw new Error("Wallet address missing");
  const walletAddress = process.argv[3];

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

  // Process getVotes
  console.log(`Processing getVotes for walletAddress=${walletAddress} tokenAddress=${tokenAddress}`);
  const votesBn = await tokenContract.getVotes(walletAddress);
  const votes = ethers.utils.formatEther(votesBn);
  console.log(`Votes = ${votes}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
