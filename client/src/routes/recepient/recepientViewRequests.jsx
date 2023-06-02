import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from "../../axios/axios"
import "../../css/recepientViewRequests.css"

function RecepientViewRequests() {
    const {userName} = useParams();
    const navigate = useNavigate()
    const [viewRequests, setviewRequests] = useState()
    useEffect(()=>{
        const fetchRequests = async()=>{
            const response = await axios.get(`/api/recepient/fetch-requests/${userName}`)
            console.log(response.data.requestsDetails)
            setviewRequests(response.data.requestsDetails.donationRequestsDetails.reverse())
        }
        fetchRequests();
    },[])

    const handleFileView = async(path)=>{
        window.open(`https://shruthimajorproject.infura-ipfs.io/ipfs/${path}`,"_blank")
    }

    const handleBack = async()=>{
        navigate(`/recepient-home/${userName}`)
    }
    return (
        <div className='recepientViewRequests'>
            <div className='userName'>
                
                <h2>Requests Made</h2>
            </div>

            {viewRequests&&<div className='tx'>
            <h3>{userName}</h3>
                <table >
                    <thead>
                        <tr className='table-header'>
                            <th>S.NO</th>
                            <th>Date of Request</th>
                            <th>Reason</th>
                            <th>View Uploaded Proof</th>
                            <th>Requested Amount</th>
                            {/* <th>Status</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    {viewRequests.map((data,index)=>{
                        console.log(data.requestReasonIpfsHash)
                        return (
                            <tr>
                                <td>{index+1}</td>
                                <td>{data.requestedDate.toString()}</td>
                                <td>{data.requestReason}</td>
                                <td><button onClick={()=>handleFileView(data.requestReasonIpfsHash)} >View</button></td>
                                <td>{data.requestedAmount}</td>
                                {/* <td>{data.requestStatus}</td> */}
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
    )
}

export default RecepientViewRequests