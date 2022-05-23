import { ethers } from "ethers";
import "dotenv/config";
import * as tokenJson from "../../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { connectToWallet } from "../utils";

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

/**
 * > deployment
 * 
 * Deploy ballot with environment's wallet as the chairperson.
 */
async function main() {
  // Get inputs
  const proposals = process.argv.slice(2);
  if (proposals.length < 2) throw new Error("Not enough proposals provided");

  // Connect to wallet
  const { signer } = await connectToWallet();

  // Deploy wallet
  console.log("Deploying CustomBallot contract");
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });
  
  const TokenFactory = new ethers.ContractFactory(
    tokenJson.abi,
    tokenJson.bytecode,
    signer
  );
  const tokenContract = await TokenFactory.deploy(
    convertStringArrayToBytes32(proposals)
  );
  console.log("Awaiting confirmations");
  await tokenContract.deployed();
  console.log("Completed");
  console.log(`Contract deployed at ${tokenContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
