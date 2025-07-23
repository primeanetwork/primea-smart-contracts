import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with ${deployer.address}`);

  const TestToken = await ethers.getContractFactory("TestToken");
  const prim = await TestToken.deploy("PRIM", "PRIM");
  await prim.deployed();
  console.log("PRIM deployed to:", prim.address);

  const usdp = await TestToken.deploy("USDP", "USDP");
  await usdp.deployed();
  console.log("USDP deployed to:", usdp.address);

  const TokenRegistry = await ethers.getContractFactory("TokenRegistry");
  const registry = await TokenRegistry.deploy();
  await registry.deployed();
  console.log("TokenRegistry deployed to:", registry.address);

  const GovernedPoolFactory = await ethers.getContractFactory("GovernedPoolFactory");
  const factory = await GovernedPoolFactory.deploy(registry.address);
  await factory.deployed();
  console.log("GovernedPoolFactory deployed to:", factory.address);

  const dir = path.join(__dirname, "..", "deployments", "testnet");
  await fs.promises.mkdir(dir, { recursive: true });
  const outFile = path.join(dir, "tokens.json");
  const data = {
    PRIM: prim.address,
    USDP: usdp.address,
    TokenRegistry: registry.address,
    GovernedPoolFactory: factory.address,
  };
  await fs.promises.writeFile(outFile, JSON.stringify(data, null, 2));
  console.log("Addresses written to", outFile);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
