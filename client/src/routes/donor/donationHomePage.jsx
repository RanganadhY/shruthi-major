import React,{useState} from 'react'
import { useLocation,useNavigate,useParams } from 'react-router-dom'
import "../../css/donationHomePage.css"

function DonationHomePage() {
    const {state} = useLocation()
    console.log(state)
    const navigate = useNavigate()
    const {userName} = useParams()

    const handleViewDonations = async()=>{
        navigate(`/${userName}/view-donation-requests`,{state:state})
    }
    const donationHistory = async()=>{
        navigate(`/donations-history/${userName}`,{state:state})
    }
    const handleLogOut = async()=>{
        navigate("/login")
    }
    return (
        <>
            <div className="dmp-main-container">
                <div className="dmp-haeding">
                    <h1>Donation Home Page</h1>
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
                <div className="dmp-funtinlity-container">
                    <div className="dmp-donation-requests-conatiner">
                        <button onClick={handleViewDonations}>View Requets</button>
                    </div>
                    <div className="dmp-donation-requests-conatiner">
                        <button onClick={donationHistory}>Transaction History</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DonationHomePage