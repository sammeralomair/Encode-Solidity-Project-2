import * as contractABI from './CustomBallot.json';
import { ethers } from "ethers";
import { CustomBallot } from './CustomBallot';

export async function getBallot(ballotAddress: string) {
    try {
      const { ethereum } = window as any;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ballotContract = new ethers.Contract(ballotAddress, contractABI.abi, signer) as CustomBallot;

        return ballotContract;
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
    return null;
}