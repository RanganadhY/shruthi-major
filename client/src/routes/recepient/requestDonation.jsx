import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from "../../axios/axios";
import Web3 from "web3";
import "../../css/recepientDonation.css"

function RequestDonation() {

    const {userName} = useParams();

    const [requestedAmount, setrequestedAmount] = useState("");
    const [requestReason, setrequestReason] = useState();
    const [recepientMetamaskAddress, setrecepientMetamaskAddress] = useState()
    const handleRequestDonation = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(`/api/recepient/donation-request/${userName}`,
                {
                    recepientMetamaskAddress,
                    requestReason,
                    "requestedDate":new Date(),
                    requestedAmount
                })
            alert("Request Made Sucessfully")
            
        }catch(e){
            console.log(e)
            alert("Something went wrong")
        }
    }
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
    return (
        <div className='request-donation-pgstyle'>
            <div className='userName'>
                {userName}
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

            </div>
        </div>
    )
}

export default RequestDonation