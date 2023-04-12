const { ethers, network } = require("hardhat")
const contractAddresses = require("../Constants/contract-addresses.json")
const countractAbi = require("../Constants/proxy-abi.json")
require("dotenv").config()

async function ChangeAdmin() {
    const chainId = network.config.chainId.toString()
    const proxy = await ethers.getContractAt(countractAbi, contractAddresses[chainId]["Proxy"])
    // const proxy = await ethers.getContractAt("Proxy", contractAddresses[chainId]["Proxy"])
    const proxyAdminAddress = contractAddresses[chainId]["ProxyAdmin"]
    console.log("Proxy address is :", proxy.address)

    let admin = await proxy.admin()
    const txReceipt = await admin.wait(1)
    console.log("Proxy admin is :", txReceipt)

    const txReceipt2 = await proxy.changeAdmin(proxyAdminAddress)
    const txResponse2 = await txReceipt2.wait(1)

    console.log("Proxy admin changed to:", txResponse2)
    // admin = await proxy.admin()
    // console.log("Proxy admin is :", admin.value)
}

async function ChangeImpV1() {
    const chainId = network.config.chainId.toString()
    const proxy = await ethers.getContractAt("Proxy", contractAddresses[chainId]["Proxy"])

    const proxyAdmin = await ethers.getContractAt("ProxyAdmin", contractAddresses[chainId]["ProxyAdmin"])
    const txReceipt = await proxyAdmin.upgrade(proxy.address, contractAddresses[chainId]["CounterV1"])
    await txReceipt.wait(1)

    const txReceipt2 = await proxyAdmin.getProxyImplementation(contractAddresses[chainId]["Proxy"])
    const txResponse = await txReceipt2.wait(1)
    console.log("Proxy implementation changed to:", txResponse)
}

function main() {
    ChangeAdmin()
}

main()

// ChangeImpV1()
