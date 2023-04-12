const { ethers, network } = require("hardhat")

const networkConfig = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
    },
    5: {
        name: "goerli",
    },
    1: {
        name: "mainnet",
    },
    11155111: {
        name: "sepolia",
    },
}
const developmentChains = ["hardhat", "localhost"]
const contractAddressessPath = "./Constants/contract-addresses.json"
const counterV1Abi = "./Constants/counterV1-abi.json"
const counterV2Abi = "./Constants/counterV2-abi.json"
const proxyAbi = "./Constants/proxy-abi.json"
const proxyAdminAbi = "./Constants/proxyAdmin-abi.json"

module.exports = {
    networkConfig,
    developmentChains,
    contractAddressessPath,
    counterV1Abi,
    counterV2Abi,
    proxyAbi,
    proxyAdminAbi,
}
