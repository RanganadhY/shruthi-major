import React, {useState, useEffect } from 'react'
import {useNavigate, useLocation} from "react-router-dom"
import "../css/home.css"
import Web3 from "web3";
const CONTRACT_ADDRESS = "0xFfa28880647FDAA98f1e6e92Cfd0671D316122f6"
const CONTRACT_ABI = '[{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"donate","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTotalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDonations","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"helloworld","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"num","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userDonations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'
function Home() {
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(state)
    const userShit = state;
    console.log(userShit)
    const handleDonation = async()=>{
        navigate("/donate",{state:state})
    }
    const [totalAmount, settotalAmount] = useState();
    useEffect(()=>{
        getTotalDonation()
        async function getTotalDonation(){
            await window.ethereum.request({method:'eth_requestAccounts'});
        window.web3 = new Web3(window.ethereum);
        // const accounts = await window.web3.eth.getAccounts()
        const accounts = await window.ethereum.enable()
        console.log(accounts[0])
        const contract = await new window.web3.eth.Contract(JSON.parse(CONTRACT_ABI),CONTRACT_ADDRESS)
        console.log(contract)
        await contract.methods.getTotalDonation().call()
        .then((result)=>{
            settotalAmount(result)
        })
        
        }
    },[]);
    
    const handleHistory = async(e)=>{
        e.preventDefault();
        navigate(`/tx/${state.userDetails.userName}`,{state:userShit})
    }
    return (
        <>
            <div className="home-conatiner">
                <div className="userName-container">
                    <button onClick={handleHistory}>View History</button>
                    <p>{state.userDetails.userName}</p>
                </div>
                <div className="haeding">
                    <h2>Make Donations and Save Lives</h2>
                    
                </div>
                <div className="buttton-container">
                    <button
                    onClick={handleDonation}
                    >Become Deonor</button>
                </div>
                <div>
                    <h2>Total Amount Donated till now</h2>
                    <h3>{totalAmount} Ruppes</h3>
                </div>
            </div>
        </>
    )
}

export default Home