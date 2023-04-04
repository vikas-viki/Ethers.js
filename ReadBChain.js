const {ethers} = require('ethers');

const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/d6bedb7124704cd693692b7e7c5167c6');

const expmples = async () =>{

    console.log("Current block number: ",await provider.getBlockNumber());

    console.log("Balance: ", ethers.formatEther(await provider.getBalance("0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5")));

    
}
expmples();