const { network, ether, upgrades } = require("hardhat")
const { developmentChains, networkConfig, counterV1Abi } = require("../helper-hardhat-config.js")
const { verify } = require("../utils/verify.js")
const { writeAddress } = require("../utils/writeAddress.js")
const { updateAbi } = require("../utils/writeAbi.js")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { log, deploy } = deployments

    const args = []
    const counterV1Contract = await ethers.getContractFactory("CounterV1")
    log("----------------------------")
    log("Deploying CounterV1...")

    const counterV1 = await counterV1Contract.deploy(args)
    await counterV1.deployed()

    console.log("CounterV1 deployed to:", counterV1.address)
    log("----------------------------")

    console.log("writing address...")
    writeAddress(counterV1, "CounterV1")
    console.log("writing abi...")
    updateAbi(counterV1, counterV1Abi)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifing...")
        await verify(counterV1.address, args)
    }
}

module.exports.tags = ["all", "counterV1"]
