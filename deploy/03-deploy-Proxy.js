const { network, ether, upgrades } = require("hardhat")
const { developmentChains, networkConfig, proxyAbi } = require("../helper-hardhat-config.js")
const { verify } = require("../utils/verify.js")
const { writeAddress } = require("../utils/writeAddress.js")
const { updateAbi } = require("../utils/writeAbi.js")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { log, deploy } = deployments
    const chainId = network.config.chainId
    const args = []
    const proxyContract = await ethers.getContractFactory("Proxy")
    log("----------------------------")
    log("Deploying Proxy...")
    const proxy = await upgrades.deployProxy(proxyContract, args, {
        initializer: "initialize",
    })
    await proxy.deployed()
    console.log("Proxy deployed to:", proxy.address)
    log("----------------------------")

    console.log("writing to front end...")
    writeAddress(proxy, "Proxy")
    updateAbi(proxy, proxyAbi)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifing...")
        await verify(proxy.address, args)
    }
}

module.exports.tags = ["all", "proxy"]
