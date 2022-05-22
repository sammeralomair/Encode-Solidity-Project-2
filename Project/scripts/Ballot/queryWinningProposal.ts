import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as customBallotJson from "../../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
// eslint-disable-next-line node/no-missing-import
import { CustomBallot } from "../../typechain";
import { connectToWallet } from "../utils";
  
/**
 * > queryWinningProposal <ballotContractAddress>
 * 
 * Displays the current winning proposal and the number of votes.
 */
async function main() {
  // Get inputs
  if (process.argv.length < 3) throw new Error("Ballot address missing");
  const ballotAddress = process.argv[2];
  
  // Connect to wallet
  const { signer } = await connectToWallet();

  // Connect to contract
  const customBallotContract: CustomBallot = new Contract(
    customBallotAddress,
    customBallotJson.abi,
    signer
  ) as CustomBallot;
  
  // Get winning proposal
  const proposals = await customBallotContract.getProposals();
  const winningIdx = await customBallotContract.winningProposal();
  const winningProposal = proposals[winningIdx.toNumber()];

  const winnningVoteCount = winningProposal.voteCount.toString();
  const winnningVoteName = ethers.utils.parseBytes32String(winningProposal.name);

  console.log(`Proposal ${winnningVoteName} is winning with ${winnningVoteCount} votes`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
