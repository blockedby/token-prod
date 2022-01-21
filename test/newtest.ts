import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { Contract, ContractFactory } from "ethers";
import { ZepToken__factory,ZepToken } from "../typechain";

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('another try', () =>{
    let 
        Token: ContractFactory, 
        token1: Contract, 
        token2: Contract, 
        bridge1: Contract, 
        bridge2: Contract, 
        Bridge: ContractFactory, 
        owner: SignerWithAddress, 
        alice: SignerWithAddress, 
        bob: SignerWithAddress;

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
            
        });
        it("Modifier shouldn't works with other", async function (){
            
        });
        it("Should be transferred by account", async function (){
            await token1.connect(owner).transfer(alice,100);
            expect(await token1.balanceOf(owner)).to.equal(900);
            // expect(await token1.balanceOf(alice)).to.equal(100);
        });
        it("Transfer should fail due to lack of token amount", async () =>{

        })
        it("Should be approved", async function (){
            
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