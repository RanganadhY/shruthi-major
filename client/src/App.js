import {useState,useEffect} from "react"
import Web3 from "web3";
import './App.css';

import {Routes,Route} from "react-router-dom"


import Home from "./routes/home"

import DonationHomePage from "./routes/donor/donationHomePage";
import Donation from "./routes/donor/donationPage"
import DonationHistory from "./routes/donor/donationHistory";
import ViewDonationRequests from "./routes/donor/viewDonationRequests";
import VotingPanel from "./routes/donor/votingPanel";

import Login from "./routes/auth/login";
import Register from "./routes/auth/register";

import AdminHomePage from "./routes/admin/adminHomePage";
import AdminVeiwRequests from "./routes/admin/adminVeiwRequests";

import RecepientHomePage from "./routes/recepient/recepientHomePage";
import RequestDonation from "./routes/recepient/requestDonation";
import RecepientViewRequests from "./routes/recepient/recepientViewRequests";

const CONTRACT_ADDRESS = "0xFfa28880647FDAA98f1e6e92Cfd0671D316122f6"
const CONTRACT_ABI = '[{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"donate","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTotalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDonations","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"helloworld","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"num","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userDonations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'

function App() {

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
      // const message = await contract.methods.helloworld().call()
      // console.log(message)
      
      // const totalmessage = await contract.methods.donate(20).send({from :accounts[0]})
      // console.log(totalmessage)
      // const message = await contract.methods.getTotalDonation().call({from :accounts[0]})

      // console.log(message)
    }

  },[])
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        {/* <Route path="/donor-home" element={<Donation/>}/> */}

        <Route path="/admin-home" element={<AdminHomePage/>}/>
        <Route path="/admin/view-donation-requests" element={<AdminVeiwRequests/>}/>

        <Route path="/recepient-home/:userName" element={<RecepientHomePage/>}/>
        <Route path="/:userName/request-donation" element={<RequestDonation/>}/>
        <Route path="/recepient/view-requests/:userName" element={<RecepientViewRequests/>}/>




        <Route path="/home" element={<Home/>}/>

        <Route path="/donor-home/:userName" element={<DonationHomePage/>}/>
        <Route path="/:userName/view-donation-requests" element={<ViewDonationRequests/>}/>
        <Route path="/donate/:userName/:requestNumber" element={<Donation/>}/>
        <Route path="/donations-history/:userName" element={<DonationHistory/>}/>
        <Route path="/:userName/voting-panel/:requestNumber" element={<VotingPanel/>}/>
      </Routes>
    </div>
  );
}

export default App;
