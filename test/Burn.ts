import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("Burn", function () {
    it("Should deploy the contract", async function () {
        const WNMC = await ethers.getContractFactory("WrappedNamecoin");
            
        const wnmcDeploy = await upgrades.deployProxy(WNMC, { kind: "uups" , initializer: "initialize"});
        await wnmcDeploy.waitForDeployment();
    });

    it("Burn Tokens", async function () {
        const WNMC = await ethers.getContractFactory("WrappedNamecoin");

        const wnmcDeploy = await upgrades.deployProxy(WNMC, { kind: "uups" , initializer: "initialize"});
        await wnmcDeploy.waitForDeployment();

        const [owner, addr1] = await ethers.getSigners()

        await wnmcDeploy.mint(addr1.address, 1000);

        expect(await wnmcDeploy.balanceOf(addr1.address)).to.equal(1000);
        expect(await wnmcDeploy.totalSupply()).to.equal(1000);

        // connect to addr1
        const wnmcDeployAddr1 = wnmcDeploy.connect(addr1);

        await wnmcDeployAddr1.burn(500);

        expect(await wnmcDeploy.balanceOf(addr1.address)).to.equal(500);
        expect(await wnmcDeploy.totalSupply()).to.equal(500);
    });

    it("Check Burn Event", async function () {
        const WNMC = await ethers.getContractFactory("WrappedNamecoin");

        const wnmcDeploy = await upgrades.deployProxy(WNMC, { kind: "uups" , initializer: "initialize"});
        await wnmcDeploy.waitForDeployment();

        const [owner, addr1] = await ethers.getSigners()

        await wnmcDeploy.mint(addr1.address, 1000);

        expect(await wnmcDeploy.balanceOf(addr1.address)).to.equal(1000);
        expect(await wnmcDeploy.totalSupply()).to.equal(1000);

        // connect to addr1
        const wnmcDeployAddr1 = wnmcDeploy.connect(addr1);
        await wnmcDeployAddr1.burn(500);

        const filter = wnmcDeployAddr1.filters.Burn();
        const logs = await wnmcDeployAddr1.queryFilter(filter);

        expect(logs.length).to.equal(1);
        expect(logs[0].args[0]).to.equal(addr1.address);


        expect(await wnmcDeploy.balanceOf(addr1.address)).to.equal(500);
        expect(await wnmcDeploy.totalSupply()).to.equal(500);
    });
});


