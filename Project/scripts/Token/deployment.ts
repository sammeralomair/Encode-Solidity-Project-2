import { ethers } from "ethers";
import "dotenv/config";
import * as tokenJson from "../../artifacts/contracts/Token.sol/TweeterCoin.json";
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

  // Connect to wallet
  const { signer } = await connectToWallet();

  // Deploy wallet
  console.log("Deploying Token contract");
  
  const TokenFactory = new ethers.ContractFactory(
    tokenJson.abi,
    tokenJson.bytecode,
    signer
  );
  const tokenContract = await TokenFactory.deploy();
  console.log("Awaiting confirmations");
  await tokenContract.deployed();
  console.log("Completed");
  console.log(`Contract deployed at ${tokenContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
