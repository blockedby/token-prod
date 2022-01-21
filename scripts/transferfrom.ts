import { task } from "hardhat/config";


task("transferfrom", "Transfer tokens")
    .addParam("token", "token address")
    .addParam("from", "source address")
    .addParam("to","destination address")
    .addParam("sender","approved address")
    .addParam("amount", "amount of tokens to transfer")
    .setAction(async (taskArgs, hre) => {
        const provider = hre.ethers.provider;
        const signer = await provider.getSigner(taskArgs.sender);
        const fromAddress = await signer.getAddress();
        // const toAddress = provider.eth
        const token = await hre.ethers.getContractAt("ZepToken", taskArgs.token);
        await token.connect(signer).transferFrom(taskArgs.from,taskArgs.to, taskArgs.amount);
    });

    // 0xDFFCf8aBABc9a5D53991590809d973e572D668db