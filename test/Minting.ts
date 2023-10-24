import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("Minting", function () {
    it("Should deploy the contract", async function () {
        const WNMC = await ethers.getContractFactory("WrappedNamecoin");
            
        const wnmcDeploy = await upgrades.deployProxy(WNMC, { kind: "uups" , initializer: "initialize"});
        await wnmcDeploy.waitForDeployment();
    });

    it("Mint Tokens", async function () {
        const WNMC = await ethers.getContractFactory("WrappedNamecoin");

        const wnmcDeploy = await upgrades.deployProxy(WNMC, { kind: "uups" , initializer: "initialize"});
        await wnmcDeploy.waitForDeployment();

        const [owner, addr1] = await ethers.getSigners()

        await wnmcDeploy.mint(addr1.address, 1000);
        expect(await wnmcDeploy.balanceOf(addr1.address)).to.equal(1000);
        expect(await wnmcDeploy.totalSupply()).to.equal(1000);
    });

    it("Mint Tokens multiple times", async function () {
        const WNMC = await ethers.getContractFactory("WrappedNamecoin");

        const wnmcDeploy = await upgrades.deployProxy(WNMC, { kind: "uups" , initializer: "initialize"});
        await wnmcDeploy.waitForDeployment();

        const [owner, addr1] = await ethers.getSigners()

        await wnmcDeploy.mint(addr1.address, 1000);
        await wnmcDeploy.mint(addr1.address, 1000);
        await wnmcDeploy.mint(addr1.address, 1000);

        expect(await wnmcDeploy.balanceOf(addr1.address)).to.equal(3000);
        expect(await wnmcDeploy.totalSupply()).to.equal(3000);
    });

    it("Mint Token by non-owner", async function () {
        const WNMC = await ethers.getContractFactory("WrappedNamecoin");

        const wnmcDeploy = await upgrades.deployProxy(WNMC, { kind: "uups" , initializer: "initialize"});
        await wnmcDeploy.waitForDeployment();

        const [owner, addr1, addr2] = await ethers.getSigners()

        const wnmcDeployAsAddr1 = wnmcDeploy.connect(addr1);

        // revert with Custom Error Message AccessControlUnauthorizedAccount
        expect(wnmcDeployAsAddr1.mint(addr2.address, 1000)).to.be.revertedWith("AccessControlUnauthorizedAccount");
    });
    
    it("Assign Minter Role", async function () {
        const WNMC = await ethers.getContractFactory("WrappedNamecoin");

        const wnmcDeploy = await upgrades.deployProxy(WNMC, { kind: "uups" , initializer: "initialize"});
        await wnmcDeploy.waitForDeployment();

        const [owner, addr1, addr2] = await ethers.getSigners()

        await wnmcDeploy.grantRole(await wnmcDeploy.MINTER_ROLE(), addr1.address);

        const wnmcDeployAsAddr1 = wnmcDeploy.connect(addr1);

        await wnmcDeployAsAddr1.mint(addr2.address, 1000);

        expect(await wnmcDeploy.balanceOf(addr2.address)).to.equal(1000);
    });
});
