const { network, ether, upgrades } = require("hardhat")
const { developmentChains, networkConfig, counterV2Abi } = require("../helper-hardhat-config.js")
const { verify } = require("../utils/verify.js")
const { writeAddress } = require("../utils/writeAddress.js")
const { updateAbi } = require("../utils/writeAbi.js")

module.exports = async ({ deployments }) => {
    const { log, deploy } = deployments
    const chainId = network.config.chainId

    const args = []
    const counterV2Contract = await ethers.getContractFactory("CounterV2")
    log("----------------------------")
    log("Deploying CounterV2...")

    const counterV2 = await counterV2Contract.deploy()
    await counterV2.deployed()

    console.log("CounterV2 deployed to:", counterV2.address)
    log("----------------------------")

    console.log("writing to front end...")
    writeAddress(counterV2, "CounterV2")
    updateAbi(counterV2, counterV2Abi)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifing...")
        await verify(counterV2.address, args)
    }
}

module.exports.tags = ["all", "counterV2"]
