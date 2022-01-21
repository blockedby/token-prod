// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
// import { expect } from "chai";
// // import { ContractFactory } from "ethers";
// import { ethers } from "hardhat";
// import { ZepToken__factory,ZepToken } from "../typechain";

// describe("ZepToken", function(){

//     let token:ZepToken;
//     // let Token:ContractFactory;
//     let owner: SignerWithAddress | undefined;
//     let addr1: SignerWithAddress | undefined;
//     let addr2: SignerWithAddress | undefined;
//     let addrs: SignerWithAddress[];
//     // const [wallet,walletTo];
//     let tokenAddress: string;

//     // before(async function () {
        
//     // })
//     beforeEach(async function (){
//         // wallet = await ethers.getSigners();

//         const [deployer] = await ethers.getSigners();
//         const tokenFactory = await ethers.getContractFactory();
//         const tokenContract = await tokenFactory.deploy(0);
//         // tokenAddress = tokenContract.a;

//         expect(await tokenContract.totalSupply()).to.eq(0);

//         // Token = await ethers.getContractFactory('ZepToken');
//         // [owner, addr1, addr2, ...addrs] = await ethers.getSigners(); 
//         // token = await Token.deploy(1000);
//         // await token.deployed();
//     })
//     it("Should be deployed successfully", async function() {
//         // expect( await this.erc20.deployed().to.equal(true));
//     });
//     it("Assigns initial balance", async function (){
//         // expect(await token.balanceOf(wallet.address)).to.equal(1000);
//     })
//     it("Name should be KCNCtoken with ERC20 standart support", async function (){
//         // name symbol decimals 
//     });
//     it("Modifier should works with owner", async function (){
        
//     });
//     it("Modifier shouldn't works with other", async function (){
        
//     });
//     it("Should be transferred", async function (){
        
//     });
//     it("Should be approved", async function (){
        
//     });
//     it("Can be transferedFrom", async function (){
        
//     });
//     it("Should be allow", async function (){
        
//     });
//     it("Allowance should be increased", async function (){
        
//     });
//     it("Allowance should be decreased", async function (){
        
//     });
//     it("Should be minted", async function (){
        
//     });
//     it("Should be burned", async function (){
        
//     });
//     it("Should be burned from", async function (){
        
//     });

// });