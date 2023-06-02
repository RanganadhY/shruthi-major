import React, { useEffect,useState } from 'react'
import { useNavigate,useLocation,useParams } from 'react-router-dom';
import axios from "../../axios/axios"
import "../../css/donationhistory.css"

function VeiwTx() {
    const [saveRes, setsaveRes] = useState();
    const {userName} = useParams();
    const {state} = useLocation();
    const navigate = useNavigate()
    const handleShowDonations = async()=>{
        
        await axios.get(`/api/tx/get-txn-history/002/${userName}`)
        .then((res)=>{
            setsaveRes(res.data.txHistory)
            console.log(res.data)
        })
    }

    const handleBack = async()=>{
        navigate(`/donor-home/${userName}`,{state:state})
    }
    return (
        <div className='donation-history'>
            <div className='userName'>
                {userName}
            </div>
            <button className='show-donation-btn'
                onClick={handleShowDonations}
            >Show my donantion</button>

            {saveRes&&<div className='tx'>
                <table width="100%">
                    <thead>
                        <tr className='table-header'>
                            <th>Date of Tx</th>
                            <td>Request Number</td>
                            <th>Amount</th>
                            <th>Gas Fee</th>
                            <th>Tx Id</th>
                        </tr>
                    </thead>
                    <tbody>
                    {saveRes.map((data)=>{
                        return (
                            <tr>
                                <td>{data.dateOfTx.toString()}</td>
                                <td>{data.requestNumber}</td>
                                <td>{data.txAmount}</td>
                                <td>{data.gasFee}</td>
                            <td>{data.txHash}</td>
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

export default VeiwTx