const { ethers } = require('ethers');
const {dotenv} = require('dotenv').config();
const provider = new ethers.JsonRpcProvider('https://goerli.infura.io/v3/d6bedb7124704cd693692b7e7c5167c6');

const ABI = 
[{
    "inputs": [],
    "name": "decrementCount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "name": "incrementCount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
},
{
    "inputs": [],
    "name": "count",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "getCount",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}
]

const signer = new ethers.Wallet(process.env.PRIVATE_KEY , provider);

const address = '0xe0c66DBC86B109bbB931c2e569D19d3Db5d6F0D9';

const contract_Counter = async () => {
    const contract = new ethers.Contract(address, ABI, signer);

    console.log(Number(await contract.count()));

    console.log(await contract.incrementCount());
}

contract_Counter();