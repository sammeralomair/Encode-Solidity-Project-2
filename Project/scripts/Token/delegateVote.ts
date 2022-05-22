import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
// eslint-disable-next-line node/no-missing-import
import { CustomBallot } from "../../typechain";
import { connectToWallet } from "../utils";

/**
 * > delegateVote <ballotContractAddress> <delegateWalletAddress>
 * 
 * Delegate your vote to another wallet.
 */
async function main() {
  // Get inputs
  if (process.argv.length < 3) throw new Error("CustomBallot address missing");
  const customBallotAddress = process.argv[2];
  if (process.argv.length < 4) throw new Error("Delegate address missing");
  const delegateAddress = process.argv[3];
  console.log(
    `Attaching ballot contract interface to customBallotAddress=${customBallotAddress}`
  );

  // Connect to wallet
  const { wallet, signer } = await connectToWallet();

  // Connect to contract
  const customBallotContract: CustomBallot = new Contract(
    customBallotAddress,
    customBallotJson.abi,
    signer
  ) as CustomBallot;

  // Process delegate
  console.log(`Processing delegation for address=${wallet.address} to delege=${delegateAddress} on ballotAddress=${ballotAddress}`);
  const tx = await customBallotContract.delegate(delegateAddress);
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
