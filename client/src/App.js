import {useState,useEffect} from "react"
import Web3 from "web3";
import './App.css';

import {Routes,Route} from "react-router-dom"


import Home from "./routes/home"
import Donation from "./routes/donation"
import TranX from "./routes/veiwTx";


const CONTRACT_ADDRESS = "0x2B0f0eAA0135DD908cA2027809cdBA0C2336B87b"
const CONTRACT_ABI = '[{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"donate","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTotalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDonations","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"helloworld","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"num","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userDonations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'

function App() {


  const [myAccountAddress, setmyAccountAddress] = useState("")

  useEffect(()=>{
    getconst()
    async function getconst(){
      await window.ethereum.request({method:'eth_requestAccounts'});
      window.web3 = new Web3(window.ethereum);
      // const accounts = await window.web3.eth.getAccounts()
      const accounts = await window.ethereum.enable()
      console.log(accounts[0])
      const contract = await new window.web3.eth.Contract(JSON.parse(CONTRACT_ABI),CONTRACT_ADDRESS)
      console.log(contract)
      const message = await contract.methods.helloworld().call()
      console.log(message)
      // const totalmessage = await contract.methods.getTotalDonation().call({from :accounts[0]})
      const totalmessage = await contract.methods.donate(20).call({from :accounts[0]})
      console.log(totalmessage)
      
    }

  },[])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/donate" element={<Donation/>}/>
        <Route path="/veiw-tx" element={<TranX/>}/>
      </Routes>
    </div>
  );
}

export default App;
