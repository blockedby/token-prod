import { task } from "hardhat/config";


task("transfer", "Transfer tokens")
    .addParam("token", "token address")
    .addParam("address", "destination address")
    .addParam("amount", "amount of tokens to transfer")
    .setAction(async (taskArgs, hre) => {
        const provider = hre.ethers.provider;
        const signer = await provider.getSigner(taskArgs.sender);
        const signer_addr = await signer.getAddress();
        const token = await hre.ethers.getContractAt("ZepToken", taskArgs.token);
        await token.connect(signer).transfer(taskArgs.address, taskArgs.amount);
    });