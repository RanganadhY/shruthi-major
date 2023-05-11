import React, { useEffect,useState } from 'react'
import { useLocation,useParams } from 'react-router-dom';
import axios from "../../axios/axios"
import "../../css/viewTx.css"

function VeiwTx() {
    const [saveRes, setsaveRes] = useState();
    const {userName} = useParams();

    const handleShowDonations = async()=>{
        
        await axios.get(`/api/tx/get-txn-history/002/${userName}`)
        .then((res)=>{
            setsaveRes(res.data.txHistory)
            console.log(res.data)
        })
    }
    return (
        <>
            <div>
                <p>User Name</p>
                <p>{userName}</p>
            </div>
            <button
                onClick={handleShowDonations}
            >Show my donantion</button>

            {saveRes&&<div className='tx'>
                <table width="100%">
                    <thead>
                        <tr>
                            <th>Date of Tx</th>
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

        </>
    )
}

export default VeiwTx