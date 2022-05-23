import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as tokenJson from "../../artifacts/contracts/CustomBallot.sol/Token.json";
// eslint-disable-next-line node/no-missing-import
import { Token } from "../../typechain";
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
  if (process.argv.length < 4) throw new Error("Delegate address missing");
  const delegateAddress = process.argv[3];
  console.log(
    `Attaching token contract interface to tokenAddress=${tokenAddress}`
  );

  // Connect to wallet
  const { wallet, signer } = await connectToWallet();

  // Connect to contract
  const tokenContract: Token = new Contract(
    tokenAddress,
    tokenJson.abi,
    signer
  ) as Token;

  // Process delegate
  console.log(`Processing delegation for address=${wallet.address} to delege=${delegateAddress} on ballotAddress=${ballotAddress}`);
  const tx = await tokenContract.delegate(delegateAddress);
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
