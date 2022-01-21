import { ethers } from "ethers";
import { task } from "hardhat/config";
const {utils, BigNumber} = require('ethers');


task("balanceof", "Check token balance")
    .addParam("address", "account address")
    .addParam("token", "token address")
    .setAction(async (taskArgs, hre) => {
        const provider = hre.ethers.provider;
        const sender = await provider.getSigner();
        const token = await hre.ethers.getContractAt("ZepToken", taskArgs.token);
        const address = await provider._getAddress(taskArgs.address);
        let samount = await token.connect(sender).balanceOf(address);
        samount = Number(samount);
        console.log(samount);;
    });