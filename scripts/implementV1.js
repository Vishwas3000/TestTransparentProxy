const { ethers, network } = require("hardhat")
require("dotenv").config()
const contractAddresses = require("../Constants/contract-addresses.json")

async function implementV1() {
    console.log(contractAddresses)
    const chainId = network.config.chainId.toString()
    const counterV1 = await ethers.getContractAt("CounterV1", contractAddresses[chainId]["CounterV1"])
    // const counterV2 = await ethers.getContract("CounterV2")
    const proxy = await ethers.getContractAt("Proxy", contractAddresses[chainId]["Proxy"])
    console.log("CounterV1 address:", counterV1.address)
    // console.log("CounterV2 address:", counterV2)
}

implementV1()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
