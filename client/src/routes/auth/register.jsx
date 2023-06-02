import React,{useState,useEffect} from 'react'
import "../../css/authRoutesCss/register.css";
import {useNavigate} from "react-router-dom"
import Web3 from "web3";
import axios from "../../axios/axios"
import helpingHands from "../../assets/39258695.jpg"
const CONTRACT_ADDRESS = "0xFfa28880647FDAA98f1e6e92Cfd0671D316122f6"
const CONTRACT_ABI = '[{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"donate","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTotalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDonations","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"helloworld","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"num","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userDonations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'
function Register() {

    const [userName, setuserName] = useState();
    const [password, setpassword] = useState();
    const [confirmPassword, setconfirmPassword] = useState()
    const [metamaskAddress, setmetamaskAddress] = useState();
    const [registerType, setregisterType] = useState();
    const [panNo, setpanNo] = useState()

    const navigate = useNavigate();
    useEffect(()=>{
        getconst()
        async function getconst(){
        const CONTRACT_ADDRESS = "0xFfa28880647FDAA98f1e6e92Cfd0671D316122f6"
        const CONTRACT_ABI = '[{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"donate","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTotalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDonations","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"helloworld","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"num","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userDonations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'
        await window.ethereum.request({method:'eth_requestAccounts'});
        window.web3 = new Web3(window.ethereum);
        // const accounts = await window.web3.eth.getAccounts()
        const accounts = await window.ethereum.enable()
        setmetamaskAddress(accounts[0])
        // console.log(accounts[0])
        // const contract = await new window.web3.eth.Contract(JSON.parse(CONTRACT_ABI),CONTRACT_ADDRESS)
        // console.log(process.env.contractABI)
        // const docsUploaded = await contract.methods.helloworld().call()
        // console.log(message)
        
        // const totalmessage = await contract.methods.donate(20).send({from :accounts[0]})
        // console.log(totalmessage)
        // const message = await contract.methods.getTotalDonation().call({from :accounts[0]})
    
        // console.log(message)
        }
    
    },[])
    const handleLogin = async()=>{
        navigate("/login");
    }

    const handleRegister = async(e)=>{
        e.preventDefault();
        try{
            // await window.ethereum.request({method:'eth_requestAccounts'});
            // window.web3 = new Web3(window.ethereum);
            // // const accounts = await window.web3.eth.getAccounts()
            // const accounts = await window.ethereum.enable()
            // console.log(accounts[0])
            // const contract = await new window.web3.eth.Contract(JSON.parse(CONTRACT_ABI),CONTRACT_ADDRESS)
            // console.log(contract)
            if(registerType ==="002"){
                await axios.post("/auth/donor-register",
                    {
                        userName,
                        password,
                        metamaskAddress,
                        panNo
                    }
                ).then((response)=>{
                    navigate(`/donor-home/${userName}`,{state:response.data})
                })
                .catch((error)=>{
                    throw(error);
                })
            }
            else if(registerType ==="003"){
                await axios.post("/auth/recepient-register",
                    {
                        userName,
                        password,
                        metamaskAddress,
                        panNo
                    }
                ).then((response)=>{
                    navigate("/recepient-home",{state:response.data})
                })
                .catch((error)=>{
                    throw(error);
                })
            }
        }
        catch(error){
            if(error.response.status === 401){
                alert(error.response.data.message);
            }
            else if(error.response.status === 404){
                alert(error.response.data.message)
            }
            else if(error.response.status === 500){
                alert(error.response.data.message)
            }
            else if(error.response.status === 11000){
                alert(error.response.data.message);
            }
            else if(error.response.status === 403){
                alert(error.response.data.message);
            }
            else{
                alert("Something went wrong")
            }
        }
    }

    return (
        <>
            <div className="register-main-container">
                <div className="register-side-pic">
                    <div>
                        <img src={helpingHands} alt="" />
                    </div>
                </div>
                
                <form action="">
                <div>
                    <h2>Register Here!</h2>
                </div>
                        <div className="opt-login">
                            <div className='opt-login-opt'>
                                <label htmlFor="">Donor</label>
                                <input 
                                    type="radio"
                                    name='registerType'
                                    value="002"
                                    checked={registerType==="002"}
                                    onChange={(e)=>setregisterType(e.target.value)}
                                    />
                            </div>
                            <div className='opt-login-opt'>
                                <label htmlFor="">Recipent</label>
                                <input 
                                    type="radio"
                                    name='registerType'
                                    value="003"
                                    checked={registerType==="003"}
                                    onChange={(e)=>setregisterType(e.target.value)}
                                    />
                            </div>
                        </div>

                    <div>
                        <label htmlFor="">Name</label>
                        <input 
                            type="text"
                            value={userName}
                            onChange={(e)=>setuserName(e.target.value)}
                            />
                    </div>
                    <div>
                        <label htmlFor="">Pan Card Number</label>
                        <input 
                            type="text"
                            value={panNo}
                            onChange={(e)=>setpanNo(e.target.value.toUpperCase())}
                            />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input 
                            value={password}
                            onChange={(e)=>setpassword(e.target.value)}
                            type="password" name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">Confirm Password</label>
                        <input 
                            value={confirmPassword}
                            onChange={(e)=>setconfirmPassword(e.target.value)}
                            type="password" name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">Metamask Wallet Address</label>
                        <input 
                            value={metamaskAddress}
                            onChange={(e)=>setmetamaskAddress(e.target.value)}
                            type="text" />
                    </div>
                    <div>
                        <button type='submit' className='register-register-btn' onClick={handleRegister}>Register</button>
                    </div>
                    <div>
                        <button className="register-login-btn" onClick={handleLogin}>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register