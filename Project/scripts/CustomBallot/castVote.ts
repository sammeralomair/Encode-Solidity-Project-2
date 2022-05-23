import { Contract } from "ethers";
import "dotenv/config";
import * as customBallotJson from "../../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
// eslint-disable-next-line node/no-missing-import
import { CustomBallot } from "../../typechain";
import { connectToWallet } from "../utils";

/** 
 * > castVote <ballotContractAddress> <proposalIndex>
 * 
 * Casts a vote on behalf of the enviromnment's wallet.
 *  */
async function main() {
  // Get inputs
  if (process.argv.length < 3) throw new Error("CustomBallot address missing");
  const customBallotAddress = process.argv[2];
  if (process.argv.length < 4) throw new Error("Proposal Index missing");
  const proposalIndexStr = process.argv[3];
  const proposalIndex = parseInt(proposalIndexStr);

  // Connect to wallet
  const { wallet, signer } = await connectToWallet();

  // Connect to contract
  const customBallotContract: CustomBallot = new Contract(
    customBallotAddress,
    customBallotJson.abi,
    signer
  ) as CustomBallot;

  // Process vote
  console.log(`Processing vote=${proposalIndex} for wallet=${wallet.address} on customBallotAddress=${customBallotAddress}`);
  const proposals = await customBallotContract.getProposals();
  if (proposalIndex < 0 || proposalIndex >= proposals.length) {
    throw new Error(`Proposal index (${proposalIndex}) is out of bounds`);
  }

  const tx = await customBallotContract.vote(proposalIndex);
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
