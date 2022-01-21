import { task } from "hardhat/config";


task("balance", "Checking token balance")
    .addParam("address", "account address")
    .addParam("token", "token address")
    .setAction(async (taskArgs, hre) => {
        const token = await hre.ethers.getContractAt("ZepToken", taskArgs.contract);
        const balance = await token.balanceOf(taskArgs.address);
        console.log(balance);
    });