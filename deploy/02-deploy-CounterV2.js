const { network, ether, upgrades } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config.js")
const { verify } = require("../utils/verify.js")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { log, deploy } = deployments
    const chainId = network.config.chainId

    const args = []
    const counterV2Contract = await ethers.getContractFactory("CounterV2")
    log("----------------------------")
    log("Deploying CounterV2...")

    const counterV2 = await upgrades.deployProxy(counterV2Contract, args)
    await counterV2.deployed()

    console.log("CounterV2 deployed to:", counterV2.address)
    log("----------------------------")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifing...")
        await verify(counterV2.address, args)
    }
}

module.exports.tags = ["all", "counterV2"]
