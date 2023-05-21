import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import "../../css/recepientHomePage.css"
import { useParams } from 'react-router-dom'

function RecepientHomePage() {
    const navigate = useNavigate()
    const {state} = useLocation();
    const handleAskDonation = async()=>{
        navigate(`/${state.userDetails.userName}/request-donation/`)
    }
    const handleViewRequets = async()=>{
        navigate(`/recepient/view-requests/${state.userDetails.userName}`)
    }
    const {userName} = useParams();

    return (
        <div className='recepientHomePage-style'>
            <div className='userName'>
                {userName}
            </div>
            <div className='rec-details-container'>
                <div>
                    <button onClick={handleAskDonation}>Ask for Donation</button>
                </div>
                <div>
                    <button onClick={handleViewRequets}>View Requests</button>
                </div>
            </div>

        </div>
    )
}

export default RecepientHomePage