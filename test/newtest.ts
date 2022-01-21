import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { Contract, ContractFactory } from "ethers";
import { ZepToken__factory,ZepToken } from "../typechain";

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('another try', () =>{
    let 
        Token: ContractFactory, 
        token1: Contract, 
        // token2: Contract, 
        // bridge1: Contract, 
        // bridge2: Contract, 
        // Bridge: ContractFactory, 
        owner: SignerWithAddress, 
        alice: SignerWithAddress, 
        bob: SignerWithAddress;
    const zero_address = "0x0000000000000000000000000000000000000000";

    before(async () => {
        [alice, owner, bob] = await ethers.getSigners();
        Token = await ethers.getContractFactory("ZepToken");
    });
    beforeEach(async () => {
        token1 = await Token.connect(owner).deploy(1000);
        await token1.deployed();
    });

    describe('Deployment', () => {
        it('Should set right name', async () => {
            expect(await token1.name()).to.equal("KCNCtoken");
        });

        it('Should set right symbol', async () => {
            expect(await token1.symbol()).to.equal("KCNC");
        });
        it('Should set right decimals', async () =>{
            expect(await token1.decimals()).to.equal(18);
        }) 
        it('Should set right owner for tokens', async () => {
            expect(await token1.owner()).to.equal(owner.address);
        });
        it('Should set right balance for owner address', async () => {
            expect(await token1.balanceOf(owner.address)).to.equal(1000);
        });
        it('Balance of Alice should be zero',async () =>{
            expect(await token1.balanceOf(alice.address)).to.equal(0);
        })
        it('Should set right total supply', async () =>{
            expect(await token1.totalSupply()).to.equal(1000);
        })
        it("Modifier should works with owner", async function (){
            expect(await token1.owner()).to.equal(owner.address);
            await token1.connect(owner).mint(alice.address,100);
            await token1.connect(owner).burn(alice.address,10);
            await token1.connect(alice).approve(owner.address,90);
            await token1.connect(owner).burnFrom(alice.address,90);
        });

        it("Modifier shouldn't works with other", async function (){
            // really not Alice
            await expect(token1.owner()).to.not.equal(alice.address);
            await token1.connect(owner).transfer(alice.address,100);

            await expect(
                token1.connect(alice).mint(alice.address, 1)
            ).to.be.revertedWith("VM Exception while processing transaction: reverted with custom error 'Unauthorized()'");
        });

        it("Should be transfered by account and update balances", async function (){
            await token1.connect(owner).transfer(alice.address,100);
            expect(await token1.balanceOf(owner.address)).to.equal(900);
            expect(await token1.balanceOf(alice.address)).to.equal(100);
        });
        it("Transfer should fail due to lack of token amount", async () =>{
            await expect(
                token1.connect(owner).transfer(alice.address, 1001)
            ).to.be.revertedWith("Balance less then value");
            await expect(
                token1.connect(bob).transfer(alice.address, 1)
                // catch an error
            ).to.be.revertedWith("Balance less then value");
            
        })
        it("Transfer should fail by sending to zero address", async function (){
            await expect(
                token1.connect(owner).transfer(zero_address,100)
            ).to.be.revertedWith("'To' can't be zero");
        });
        it("Should be approved", async function (){
            
        });
        it("Approve should fail by sending to zero address", async function (){
            await expect(
                token1.connect(owner).approve(zero_address,100)
            ).to.be.revertedWith("'Spender' can't be zero");
        });
        it("Can be transferedFrom", async function (){
            
        });
        it("Should be allow", async function (){
            
        });
        it("Allowance should be increased", async function (){
            
        });
        it("Allowance should be decreased", async function (){
            
        });
        it("Should be minted", async function (){
            
        });
        it("Should be burned", async function (){
            
        });
        it("Should be burned from", async function (){
            
        });
    });
})