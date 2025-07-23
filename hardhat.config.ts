import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "^0.8.20",
  networks: {
    primeatestnet: {
      url: "https://rpc.testnet.primea.network",
      chainId: 1698369,
      accounts: process.env.PRIMEA_TESTNET_PRIVATE_KEY ? [process.env.PRIMEA_TESTNET_PRIVATE_KEY] : [],
    },
  },
};

export default config;
