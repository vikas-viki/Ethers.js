import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const ABI = [
    {
      inputs: [],
      name: "decrementCount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "incrementCount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "count",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const Caddress = "0xe0c66DBC86B109bbB931c2e569D19d3Db5d6F0D9";

  const [count, setCount] = useState("-");
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState({});
  const [loading, setLoading] = useState(false);

  async function ConnectMetamask() {
    console.log("called");

    // Check if the browser has MetaMask installed
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask first.");
      return;
    }

    // Request access to the user's MetaMask account - directly.
    // const provider = await window.ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts");

    const signer = await provider.getSigner();

    setAddress(signer.address);

    setContract(new ethers.Contract(Caddress, ABI, signer));
  }

  async function getCount() {
    try {
      setLoading(true);
      const Tcount = await contract.getCount();
      setCount(Number(Tcount));
      setLoading(false);
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  }

  async function incrementCount() {
    try {
      setLoading(true);
      const Scount = await contract.incrementCount();
      await Scount.wait();
      await getCount();
      setLoading(false);
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  }

  async function decrementCount() {
    try{
      setLoading(true);
      const Scount = await contract.decrementCount();
      await Scount.wait(); 
      await getCount();
      setLoading(false);
    }catch(e){
      alert(e.message);
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <>
        {address === null || address === "" ? (
          <button
            onClick={async () => {
              await ConnectMetamask();
            }}
          >
            Connect Metamask
          </button>
        ) : (
          <button>
            Address : &nbsp; {address.slice(0, 2) + "..." + address.slice(-6)}
          </button>
        )}
      </>

      <br />
      <br />

      <>
        {address !== "" && (
          <div className="Contract-methods">
            <button>Count: {count}</button>
            <button onClick={getCount}>Get count</button>
            <button onClick={incrementCount}>Increment</button>
            <button onClick={decrementCount}>Decrement</button>
          </div>
        )}
      </>

      <br />

      <>
        {loading && (
          <button class="buttonload">
            <i class="fa fa-spinner fa-spin"></i> Loading
          </button>
        )}
      </>
    </div>
  );
}

export default App;
