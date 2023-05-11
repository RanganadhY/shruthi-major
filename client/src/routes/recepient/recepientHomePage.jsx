import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

function RecepientHomePage() {
    const navigate = useNavigate()
    const {state} = useLocation();
    const handleAskDonation = async()=>{
        navigate(`/${state.userDetails.userName}/request-donation/`)
    }
    const handleViewRequets = async()=>{
        navigate(`/recepient/view-requests/${state.userDetails.userName}`)
    }
    return (
        <>
            <div className='recepient-HomePage-Wrapper'>
                <button onClick={handleAskDonation}>Ask for Donation</button>
            </div>
            <div>
                <button onClick={handleViewRequets}>View Requests</button>
            </div>
        </>
    )
}

export default RecepientHomePage