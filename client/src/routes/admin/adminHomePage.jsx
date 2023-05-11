import React from 'react'
import {useNavigate} from "react-router-dom"

function AdminHomePage() {
    const navigate = useNavigate();

    const handleViewRequests= async()=>{
        navigate("/admin/view-donation-requests")
    }
    return (
        <div>
            <div>
                <button onClick={handleViewRequests}>View Donation Requests</button>
            </div>
        </div>
    )
}

export default AdminHomePage