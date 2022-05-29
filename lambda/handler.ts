import { Handler } from 'aws-lambda';
import { ethers, Contract } from 'ethers';
import { TweeterCoin } from './VoteToken/TweeterCoin';

import * as voteTokenJson from './VoteToken/TweeterCoin.json' 

const MISSING_PARAM_ERROR_MESSAGE = "Missing tokenAddress";
const ALREADY_HAS_TOKENS_ERROR_MESSAGE = "Already has tokens";
const INSUFFICIENT_FUNDS_ERROR_MESSAGE = "Insufficient funds to mint";

async function _mint(tokenAddress?: string) {
  if (!tokenAddress) {
    console.log(MISSING_PARAM_ERROR_MESSAGE);
    return {
      'statusCode': 400,
      'headers': {"Content-Type": "application/json"},
      'body': JSON.stringify({
        error: MISSING_PARAM_ERROR_MESSAGE
      })
    }
  }

  const wallet = new ethers.Wallet(process.env.MINT_SECRET_KEY);
  const providerOptions = {
    alchemy: process.env.ALCHEMY_API_KEY
  }
  const provider = ethers.providers.getDefaultProvider("goerli", providerOptions);
  const signer = wallet.connect(provider);

  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  if (balance < 0.01) {
    console.log(INSUFFICIENT_FUNDS_ERROR_MESSAGE);
    return {
      'statusCode': 400,
      'headers': {"Content-Type": "application/json"},
      'body': JSON.stringify({
        error: INSUFFICIENT_FUNDS_ERROR_MESSAGE
      })
    };
  }

  const tokenContract: TweeterCoin = new Contract(
    process.env.VOTE_TOKEN_CONTRACT_ADDRESS,
    voteTokenJson.abi,
    signer
  ) as TweeterCoin;

  const zeroBN = ethers.utils.parseEther('0');
  const tokenBalance = await tokenContract.balanceOf(tokenAddress);

  if (tokenBalance.gt(zeroBN)) {
    console.log(ALREADY_HAS_TOKENS_ERROR_MESSAGE);
    return {
      'statusCode': 400,
      'headers': {"Content-Type": "application/json"},
      'body': JSON.stringify({
        error: ALREADY_HAS_TOKENS_ERROR_MESSAGE
      })
    };
  }

  console.log(`Processing minting for address=${wallet.address} to receiver=${tokenAddress} on tokenAddress=${tokenAddress}`);
  const oneBN = ethers.utils.parseEther('1');
  const tx = await tokenContract.mint(tokenAddress, oneBN);
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);

  return {
    'statusCode': 200,
    'headers': {"Content-Type": "application/json"},
    'body': JSON.stringify({
      transactionHash: tx.hash
    })
  };
}

export const mint: Handler = (event: any) => {
  const { tokenAddress } = event.pathParameters;
  return _mint(tokenAddress);
}