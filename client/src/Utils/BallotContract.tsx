import customBallotJson from './CustomBallot.json';
import { ethers } from "ethers";
import { CustomBallot } from './CustomBallot';
import { convertStringArrayToBytes32 } from './EthersUtils';
import { VOTE_TOKEN_CONTRACT_ADDRESS } from '../Config/Config'

export async function createBallot(ballotTitle: string, ballotOptions: string[]) : Promise<CustomBallot | null> {  
  try {
    const { ethereum } = window as any;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const customBallotFactory = new ethers.ContractFactory(
        customBallotJson.abi,
        customBallotJson.bytecode,
        signer
      );

      const customBallotContract = await customBallotFactory.deploy(ethers.utils.formatBytes32String(ballotTitle), convertStringArrayToBytes32(ballotOptions), VOTE_TOKEN_CONTRACT_ADDRESS);
      await customBallotContract.deployed();

      return customBallotContract as CustomBallot;
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }

  return null;
}

export async function getBallot(ballotAddress: string) {
    try {
      const { ethereum } = window as any;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ballotContract = new ethers.Contract(ballotAddress, customBallotJson.abi, signer) as CustomBallot;

        return ballotContract;
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
    return null;
}