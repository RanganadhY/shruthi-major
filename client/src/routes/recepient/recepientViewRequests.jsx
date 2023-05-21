import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from "../../axios/axios"
import "../../css/recepientViewRequests.css"

function RecepientViewRequests() {
    const {userName} = useParams();
    const [viewRequests, setviewRequests] = useState()
    useEffect(()=>{
        const fetchRequests = async()=>{
            const response = await axios.get(`/api/recepient/fetch-requests/${userName}`)
            console.log(response.data.requestsDetails)
            setviewRequests(response.data.requestsDetails.donationRequestsDetails)
        }
        fetchRequests();
    },[])
    return (
        <div className='recepientViewRequests'>
            <div className='userName'>
                {userName}
            </div>
            {viewRequests&&<div className='tx'>
                <table >
                    <thead>
                        <tr className='table-header'>
                            <th>Date of Request</th>
                            <th>Reason</th>
                            <th>Requested Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {viewRequests.map((data)=>{
                        return (
                            <tr>
                                <td>{data.requestedDate.toString()}</td>
                                <td>{data.requestReason}</td>
                                <td>{data.requestedAmount}</td>
                                <td>{data.requestStatus}</td>
                            </tr>
                        )
                    })}
                    
                </tbody>
                </table>
                
            </div>
            }
        </div>
    )
}

export default RecepientViewRequests