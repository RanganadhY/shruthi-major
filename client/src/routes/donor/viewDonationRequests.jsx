import React,{useState,useEffect} from 'react'
import { useParams,useNavigate ,useLocation} from 'react-router-dom'
import axios from "../../axios/axios"

import "../../css/viewDonationReequests.css"
function ViewDonationRequests() {

    const navigate = useNavigate();
    const {userName} = useParams()
    const {state} = useLocation()

    const [donationRequests, setdonationRequests] = useState()
    useEffect(()=>{
        fetchRequets()
        async function fetchRequets(){
            const response = await axios.get("/api/donor/get-requests")
            console.log(response)
            setdonationRequests(response.data.donationRequests.reverse())
        }

    },[])

    const handleVoting = async(requestNumber)=>{
        navigate(`/${userName}/voting-panel/${requestNumber}`,{state:state})
    }
    const handleBack = async()=>{
        navigate(`/donor-home/${userName}`,{state:state})
    }
    const handlePendingDonation = async(requestNumber)=>{
        navigate(`/donate/${userName}/${requestNumber}`)
    }

    const handleFileView = async(path)=>{
        window.open(`https://shruthimajorproject.infura-ipfs.io/ipfs/${path}`,"_blank")
    }
    return (
        <div>
            <div className="vdr-main-conatiner">
            <div className='userName'>
                <h2>Donation Requests</h2>
            </div>
            {donationRequests&&<div className='tx'>
                <table >
                    <thead>
                        <tr className='table-header'>
                            <th>Request Number</th>
                            <th>Date of Request</th>
                            <th>Reason</th>
                            <th>Requested Amount</th>
                            <th>Intial Amount Required to donate</th>
                            <th>Proof</th>
                            <th>Voting Eligibility</th>
                            <th>Donation Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {donationRequests.map((data)=>{
                        return (
                            <tr>
                                <td>{data.requestNumber}</td>
                                <td>{data.requestedDate.toString()}</td>
                                <td>{data.requestReason}</td>
                                <td>{data.requestedAmount} Eth</td>
                                <td>{data.intialMinAmount}Eth</td>
                                <td><button onClick={()=>handleFileView(data.requestReasonIpfsHash)} >View Proof</button></td>
                                {data.votesCastedBy.includes(userName)?<td>Voting Done</td>:<td><button onClick={()=>handleVoting(data.requestNumber)}>Go for Voting</button></td>}
                                {
                                    (((data.yesVoters>data.noVoters) && data.approvedVoters.includes(userName))&& !(data.donatedDonors.includes(userName)))?<button onClick={()=>handlePendingDonation(data.requestNumber)} >Donation Pending</button>:
                                    ((data.donatedDonors.includes(userName)))?<p className='donation-status'>Donation Completed</p>:
                                    (data.votesCastedBy.length<data.totalVoters)?<p className='donation-status' >Voting In progress</p>
                                    :<p className='donation-status' >Request declined</p>
                                }
                            </tr>
                        )
                    })}
                    
                </tbody>
                </table>
                
            </div>
            }
                <div className='vp-go-back-btn'>
                    <button  onClick={handleBack}>Go Back</button>
                </div>
            </div>
            
        </div>
    )
}

export default ViewDonationRequests