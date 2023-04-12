const { network, ether, upgrades } = require("hardhat")
const { developmentChains, networkConfig, proxyAdminAbi } = require("../helper-hardhat-config.js")
const { verify } = require("../utils/verify.js")
const { writeAddress } = require("../utils/writeAddress.js")
const { updateAbi } = require("../utils/writeAbi.js")

module.exports = async ({ deployments }) => {
    const { log, deploy } = deployments
    const chainId = network.config.chainId
    const args = []
    const proxyAdminContract = await ethers.getContractFactory("ProxyAdmin")
    log("----------------------------")
    log("Deploying ProxyAdmin...")
    const proxyAdmin = await proxyAdminContract.deploy(args)
    await proxyAdmin.deployed()

    console.log("ProxyAdmin deployed to:", proxyAdmin.address)
    log("----------------------------")

    console.log("writing to front end...")
    writeAddress(proxyAdmin, "ProxyAdmin")
    updateAbi(proxyAdmin, proxyAdminAbi)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifing...")
        await verify(proxyAdmin.address, args)
    }
}

module.exports.tags = ["all", "proxy"]
