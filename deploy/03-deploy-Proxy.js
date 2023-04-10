const { network, ether, upgrades } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config.js")
const { verify } = require("../utils/verify.js")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { log, deploy } = deployments
    const chainId = network.config.chainId

    const args = []
    const proxyContract = await ethers.getContractFactory("Proxy")
    log("----------------------------")
    log("Deploying Proxy...")

    const proxy = await upgrades.deployProxy(proxyContract, args)
    await proxy.deployed()

    console.log("Proxy deployed to:", proxy.address)
    log("----------------------------")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifing...")
        await verify(proxy.address, args)
    }
}

module.exports.tags = ["all", "proxy"]
