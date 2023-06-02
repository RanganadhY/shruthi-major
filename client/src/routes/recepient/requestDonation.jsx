import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import axios from "../../axios/axios";
import Web3 from "web3";
import "../../css/recepientDonation.css"
import { create as ipfsHttpClient } from "ipfs-http-client";
const CONTRACT_ADDRESS = "0xFfa28880647FDAA98f1e6e92Cfd0671D316122f6"
const CONTRACT_ABI = '[{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"donate","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTotalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDonations","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"helloworld","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"num","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userDonations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'

const projectId = "2QcQ3tRkrU6Wn3y9S6TzgFXaCxg";
const projectSecret = "8e9cba97e07a721c916d4eb177fc3b63";
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

function RequestDonation() {

    const {userName} = useParams();
    const navigate = useNavigate()

    const [requestedAmount, setrequestedAmount] = useState("");
    const [requestReason, setrequestReason] = useState();
    const [totalDonors, settotalDonors] = useState()
    const [recepientMetamaskAddress, setrecepientMetamaskAddress] = useState()
    const [file, setfile] = useState()

    const ipfs = ipfsHttpClient({
        url: "https://ipfs.infura.io:5001/",
        headers:{
            authorization
        }
    })

    const handleRequestDonation = async(e)=>{
        e.preventDefault();
        try{
            const {path}= await ipfs.add(file)
            console.log(path)
            await window.ethereum.request({method:'eth_requestAccounts'});
            window.web3 = new Web3(window.ethereum);
            // const accounts = await window.web3.eth.getAccounts()
            const accounts = await window.ethereum.enable()
            const contract = await new window.web3.eth.Contract(JSON.parse(CONTRACT_ABI),CONTRACT_ADDRESS)
            await contract.methods.donate(1).send({from :accounts[0]})
            .then(async(res)=>{
                await axios.post(`/api/recepient/donation-request/${userName}`,
                    {
                        recepientMetamaskAddress,
                        requestReason,
                        "requestedDate":new Date(),
                        requestedAmount,
                        "intialMinAmount":(requestedAmount/(totalDonors*0.6)),
                        "totalVoters":totalDonors,
                        "requestReasonIpfsHash":path
                    })
                alert("Request Made Sucessfully")
            })
            
        }catch(e){
            console.log(e)
            alert("Something went wrong")
        }
    }
    useEffect(()=>{
        getTotalDonors()
        async function getTotalDonors(){
            try{
                const response = await axios.get("/api/donor/get-donors/")
                settotalDonors(response.data.donorsCount)
            }catch(e){
                console.log(e)
                alert("something went wrong")
            }
        }
    },[])
    useEffect(()=>{
        getconst()
        async function getconst(){
            await window.ethereum.request({method:'eth_requestAccounts'});
            window.web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.enable()
            setrecepientMetamaskAddress(accounts[0])
            console.log(accounts[0])
        }
    
    },[])
    const handleBack = async()=>{
        navigate(`/recepient-home/${userName}`)
    }
    return (
        <div className='request-donation-pgstyle'>
            <div className='userName'>
                <h2>{userName}</h2>
            </div>
            <div className="rd-main-container">
                <div className='form-holder-css'>
                    <form action="" >
                        <div className='form-div-rec'>
                            <label htmlFor="">Reason For Donation</label>
                            <textarea 
                                name="" id="" cols="30" rows="2"
                                value={requestReason}
                                onChange={(e)=>setrequestReason(e.target.value)}
                                ></textarea>
                        </div>
                        <div className='form-div-rec'>
                            <label htmlFor="">Proof</label>
                            <input 
                                type="file" 

                                onChange={(e)=>setfile(e.target.files[0])}
                            />
                        </div>
                        <div className='form-div-rec'>
                            <label htmlFor="">Amount Needed</label>
                            <input 
                                type="text"
                                value={requestedAmount} 
                                onChange={(e)=>setrequestedAmount(e.target.value)}
                            />
                        </div>
                        <div>
                            <button onClick={handleRequestDonation}>Request Donation</button>
                        </div>
                    </form>
                </div>
                <div className='vp-go-back-btn'>
                    <button  onClick={handleBack}>Go Back</button>
            </div>
            </div>
        </div>
    )
}

export default RequestDonation