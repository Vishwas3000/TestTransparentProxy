const { network, ether, upgrades } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config.js")
const { verify } = require("../utils/verify.js")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { log, deploy } = deployments
    const chainId = network.config.chainId

    const args = []
    const counterV1Contract = await ethers.getContractFactory("CounterV1")
    log("----------------------------")
    log("Deploying CounterV1...")

    const counterV1 = await upgrades.deployProxy(counterV1Contract, args)
    await counterV1.deployed()

    console.log("Pizza deployed to:", counterV1.address)
    log("----------------------------")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifing...")
        await verify(counterV1.address, args)
    }
}

module.exports.tags = ["all", "counterV1"]
