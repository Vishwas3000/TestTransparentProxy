const { ethers, network } = require("hardhat")
const contractAddresses = require("../Constants/contract-addresses.json")
const countractAbi = require("../Constants/proxy-abi.json")
require("dotenv").config()

async function ChangeAdmin() {
    const chainId = network.config.chainId.toString()
    const proxy = await ethers.getContractAt(countractAbi, contractAddresses[chainId]["Proxy"])
    const proxyAdminAddress = contractAddresses[chainId]["ProxyAdmin"]

    let admin = await proxy.admin()

    console.log(admin)

    const [signer] = await ethers.getSigners()
    console.log(signer.address, admin)
    if (admin == signer.address) {
        const txReceipt2 = await proxy.changeAdmin(proxyAdminAddress)
        const txResponse2 = await txReceipt2.wait(1)
    }

    admin = await proxy.admin()
    console.log("Proxy admin is :", admin)
}

async function ChangeImpV1() {
    const chainId = network.config.chainId.toString()

    const proxyAdmin = await ethers.getContractAt("ProxyAdmin", contractAddresses[chainId]["ProxyAdmin"])

    // const txReceipt = await proxyAdmin.upgrade(
    //     contractAddresses[chainId]["Proxy"],
    //     contractAddresses[chainId]["CounterV2"]
    // )
    // const txResponse = await txReceipt.wait(1)
    // console.log("Proxy admin upgrade to V1:", txResponse)

    const txReceipt2 = await proxyAdmin.getProxyAdmin(contractAddresses[chainId]["Proxy"])
    console.log("Proxy admin ", txReceipt2)

    const txReceipt3 = await proxyAdmin.getProxyImplementation(contractAddresses[chainId]["Proxy"])
    console.log("Proxy implementation ", txReceipt3)
}

function main() {
    ChangeAdmin()
    ChangeImpV1()
}

main()
