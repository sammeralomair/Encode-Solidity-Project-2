import { Contract, ethers } from "ethers";
import * as customBallotJson from "../../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
// eslint-disable-next-line node/no-missing-import
import { CustomBallot } from "../../typechain";
import { connectToWallet } from "../utils";
  
/**
 * > queryProposals <ballotContractAddress>
 * 
 * Outputs proposals and vote count
 */
async function main() {
  // Get inputs
  if (process.argv.length < 3) throw new Error("Ballot address missing");
  const customBallotAddress = process.argv[2];
  
  // Connect to wallet
  const { signer } = await connectToWallet();

  // Connect to contract
  const customBallotContract: CustomBallot = new Contract(
    customBallotAddress,
    customBallotJson.abi,
    signer
  ) as CustomBallot;

  // Query proposals
  const proposals = await customBallotContract.getProposals();
  
  console.log();
  console.log(`-----------------------------------`);
  console.log(`index) proposal_name proposal_votes`);
  console.log(`-----------------------------------`);
  console.log();
  for (let index = 0; index < proposals.length; index++) {
    console.log(`${index}) ${ethers.utils.parseBytes32String(proposals[index].name)} ${proposals[index].voteCount.toString()}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
