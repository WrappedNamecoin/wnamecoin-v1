import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("Deployment", function () {
    it("Should deploy the contract", async function () {
        const WNMC = await ethers.getContractFactory("WrappedNamecoin");
            
        const wnmcDeploy = await upgrades.deployProxy(WNMC, { kind: "uups" , initializer: "initialize"});
        await wnmcDeploy.waitForDeployment();
    });

    it("After deployment, the contract should have a name", async function () {
        const WNMC = await ethers.getContractFactory("WrappedNamecoin");

        const wnmcDeploy = await upgrades.deployProxy(WNMC, { kind: "uups" , initializer: "initialize"});
        await wnmcDeploy.waitForDeployment();

        expect(await wnmcDeploy.name()).to.equal("WrappedNamecoin");
    });

    it("After deployment, the contract ERC-20 Token should have a symbol", async function () {
        const WNMC = await ethers.getContractFactory("WrappedNamecoin");

        const wnmcDeploy = await upgrades.deployProxy(WNMC, { kind: "uups" , initializer: "initialize"});
        await wnmcDeploy.waitForDeployment();

        expect(await wnmcDeploy.symbol()).to.equal("WNMC");
    }); 

    it("After deployment, the contract should have a total supply", async function () {
        const WNMC = await ethers.getContractFactory("WrappedNamecoin");

        const wnmcDeploy = await upgrades.deployProxy(WNMC, { kind: "uups" , initializer: "initialize"});
        await wnmcDeploy.waitForDeployment();

        expect(await wnmcDeploy.totalSupply()).to.equal(0);
    }); 

    it("After deployment, the contract should have a decimals", async function () {
        const WNMC = await ethers.getContractFactory("WrappedNamecoin");

        const wnmcDeploy = await upgrades.deployProxy(WNMC, { kind: "uups" , initializer: "initialize"});
        await wnmcDeploy.waitForDeployment();

        expect(await wnmcDeploy.decimals()).to.equal(18);
    });
}
);
