import { task } from "hardhat/config";
import Web3 from "web3";
require("@nomiclabs/hardhat-web3");

task("approve", "Approves account to transferFrom")
    .addParam("token", "deployed contract addresss")
    .addParam("spender", "to allow to")
    .addParam("value", "amount of tokens to approve")
    .addParam("sender", "address, from you want to approve")
    .setAction(async (taskArgs, hre) => {
        const provider = hre.ethers.provider;
        const sender = await provider.getSigner(taskArgs.sender);
        const owner = await sender.getAddress();
        const token = await hre.ethers.getContractAt("ZepToken", taskArgs.token);
        await token.connect(sender).approve(taskArgs.spender, taskArgs.value);
        await token.allowance(owner, taskArgs.spender);
    });