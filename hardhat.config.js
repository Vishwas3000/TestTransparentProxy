require("@openzeppelin/hardhat-upgrades")
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("@nomiclabs/hardhat-ethers")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL

const PRIVATE_KEY = process.env.PRIVATE_KEY

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
    solidity: {
        compilers: [{ version: "0.8.7" }],
    },
    defaultNetwork: "localhost",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
            allowUnlimitedContractSize: true,
            gas: 2100000,
            gasPrice: 8000000000,
        },
        localhost: {
            chainId: 31337,
            blockConfirmations: 1,
            allowUnlimitedContractSize: true,
            gas: 2100000,
            gasPrice: 8000000000,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],

            blockConfirmations: 6,
            saveDeployments: true,
            chainId: 5,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            blockConfirmations: 6,
            saveDeployments: true,
            chainId: 11155111,
            allowUnlimitedContractSize: true,
        },
    },
    etherscan: {
        // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: {
            goerli: ETHERSCAN_API_KEY,
            sepolia: ETHERSCAN_API_KEY,
        },
        customChains: [
            {
                network: "goerli",
                chainId: 5,
                urls: {
                    apiURL: "https://api-goerli.etherscan.io/api",
                    browserURL: "https://goerli.etherscan.io",
                },
            },
        ],
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
            5: 0,
        },
        player: {
            default: 1,
        },
    },
}
