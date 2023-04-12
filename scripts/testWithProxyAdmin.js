const { ethers, network } = require("hardhat")
require("dotenv").config()
const contractAddresses = require("../Constants/contract-addresses.json")
const proxyAdminAbi = require("../Constants/proxyAdmin-abi.json")

async function ChangeOwner() {
    const chainId = network.config.chainId.toString()
    const proxyAdmin = await ethers.getContractAt(proxyAdminAbi, contractAddresses[chainId]["ProxyAdmin"])

    const txReceipt2 = await proxyAdmin.changeOwner(contractAddresses[chainId]["ProxyAdmin"])
    const txResponse2 = await txReceipt2.wait(1)

    console.log("Proxy admin owner changed to:", txResponse2)

    // const txReceipt3 = await proxyAdmin.getProxyAdmin(contractAddresses[chainId]["Proxy"].toString())
    // const txResponse3 = await txReceipt3.wait(1)
    // console.log("Proxy admin :", txReceipt3)
}

ChangeOwner()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
