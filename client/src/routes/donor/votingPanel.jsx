import React,{useState,useEffect} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from "../../axios/axios"
import Web3 from "web3";
import "../../css/votingPanel.css"
const CONTRACT_ADDRESS = "0xFfa28880647FDAA98f1e6e92Cfd0671D316122f6"
const CONTRACT_ABI = '[{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"donate","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTotalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDonations","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"helloworld","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"num","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userDonations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'

function VotingPanel() {
    const {userName,requestNumber } = useParams();
    const navigate = useNavigate();
    const {state} = useLocation();

    const [isEligible, setisEligible] = useState()
    const [iscastSucessfull, setiscastSucessfull] = useState()
    useEffect(()=>{
        getVotingStatus()
        async function getVotingStatus(){
            try{
                const response = await axios.get(`/api/voting/user-eligibility/${userName}/${requestNumber}/`)
                setisEligible(response.data.eligibility)
                console.log(response.data.eligibility)
            }
            catch(e){
                console.log(e)
                alert("Something went wrong")
                
            }
        }
    },[])
    const web3 = new Web3(window.ethereum);
    const handleYesClick= async()=>{
        try{
            await window.ethereum.request({method:'eth_requestAccounts'});
            window.web3 = new Web3(window.ethereum);
            // const accounts = await window.web3.eth.getAccounts()
            const accounts = await window.ethereum.enable()
            const contract = await new window.web3.eth.Contract(JSON.parse(CONTRACT_ABI),CONTRACT_ADDRESS)
            await contract.methods.donate(1).send({from :accounts[0]})
            .then(async(res)=>{
                await axios.post("/api/voting/cast-yes",{userName,requestNumber})
                setiscastSucessfull(true)
                alert("Votes Casted Sucessfully")
            })
            .catch((err)=>{
                throw(err)
            })
        }catch(e){
            console.log(e)
            setiscastSucessfull(false)
            alert("Something went wrong")
        }
    }
    const handleNoClick = async()=>{
        try{
            await window.ethereum.request({method:'eth_requestAccounts'});
            window.web3 = new Web3(window.ethereum);
            // const accounts = await window.web3.eth.getAccounts()
            const accounts = await window.ethereum.enable()
            const contract = await new window.web3.eth.Contract(JSON.parse(CONTRACT_ABI),CONTRACT_ADDRESS)
            await contract.methods.donate(1).send({from :accounts[0]})
            .then(async(res)=>{
                await axios.post("/api/voting/cast-no",{userName,requestNumber})
                setiscastSucessfull(true)
                alert("Votes Casted Sucessfully")
            })
            .catch((err)=>{
                throw(err)
            })
        }catch(e){
            console.log(e)
            setiscastSucessfull(false)
            alert("Something went wrong")
            
        }
    }
    const handleBack = async()=>{
        navigate(`/donor-home/${userName}`,{state:state})
    }
    return (
        <>
            <div className="vp-main-conntainer">
                <div className="vp-heading">
                    <h1> Voting Panel</h1>
                </div>
                <div className="vp-heading">
                    <h2> Request Number: {requestNumber}</h2>
                </div>
                {(iscastSucessfull || !isEligible)?
                    <>
                    <p>You have already voted for this</p>
                    </>
                    :
                    <div className="vp-voting-buttons-container">
                        <h2>Your Decesion</h2>
                        <div className="vp-yes-button">
                            <button onClick={handleYesClick} >Yes</button>
                            <button onClick={handleNoClick} >No</button>
                        </div>
                    </div>
                }
                <div className='vp-go-back-btn'>
                    <button onClick={handleBack}>Go Back</button>
                </div>
                
            </div>
        </>
    )
}

export default VotingPanel