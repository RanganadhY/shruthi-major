import React,{useState,useEffect} from 'react'
import axios from "../../axios/axios"
import Web3 from "web3";
import { adminWalletId } from '../../env/env';


function VeiwRequests() {

    const [viewRequests, setviewRequests] = useState()
    useEffect(()=>{
        const fetchDoinationRequests= async()=>{
            const response= await axios.get("/api/admin/fetch-donation-requests/")
            setviewRequests(response.data.requestsDetails.donationRequests)
            console.log(response.data.requestsDetails.donationRequests)
        }
        fetchDoinationRequests()
    },[])

    
    return (
        <>
            <DonationRequestsTable 
                viewRequests={viewRequests}
            />
        </>
    )
}

function DonationRequestsTable({viewRequests}){
    console.log(viewRequests)

    const handleApprove= async(recepientMetamaskAddress,recepientUserName,requestNumber,requestedAmount)=>{
        console.log(recepientMetamaskAddress,recepientUserName,requestNumber,requestedAmount)
        try {
            const web3 = new Web3(window.ethereum);
            // Prompt user to connect to MetaMask
            await window.ethereum.enable();
        
            // Get the sender's account
            const accounts = await web3.eth.getAccounts();
            const fromAccount = accounts[0];
        
            // Create the transaction object
            const amount = web3.utils.toWei(requestedAmount, 'ether'); // the amount to send in wei
            const gasLimit = await web3.eth.getBlock('latest').gasLimit;
            const gasPrice = await web3.eth.getGasPrice();
            
            const txObject = {
                from: fromAccount,
                to:recepientMetamaskAddress,
                value: amount,
                gasLimit: gasLimit,
                gasPrice: gasPrice,
            };
            const txDetails = await web3.eth.sendTransaction(txObject);
            const savingRes = await axios.post("/api/admin/approve-request/",{
                "txHash":txDetails.transactionHash,
                "gasFee":txDetails.gasUsed,
                "txAmount":requestedAmount,
                "dateOfTx":new Date(),
                recepientUserName,
                requestNumber
            })
            console.log('Transaction hash:', txDetails);
            alert("Donation Sucessfull")
            
        } catch (e) {
            console.error(e);
            alert("Something went wrong")
        }
    }
    const handleReject = async(recepientUserName,requestNumber)=>{
        try{
            const res = axios.post("/api/admin/cancel-request",{recepientUserName,requestNumber})
            alert("Request Rejected sucessfully")
        }
        catch(e){
            console.log(e)
            alert("Something went wrong")
        }
    }
    return (
        <>
        {viewRequests&&<div className='tx'>
            <table width="100%">
                <thead>
                    <tr>
                        <th>Date of Request</th>
                        <th>Reason</th>
                        <th>Requested Amount</th>
                        <th>Metamask Address</th>
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
                                <td>{data.recepientMetamaskAddress}</td>
                                <td>{data.requestStatus}</td>
                                <td><button onClick={()=>handleApprove(data.recepientMetamaskAddress,data.recepientUserName,data.requestNumber,data.requestedAmount)} disabled={(data.requestStatus==="approved"||data.requestStatus==="rejected")?true:false} >Approve</button></td>
                                <td><button onClick={()=>handleReject(data.recepientUserName,data.requestNumber)} disabled={(data.requestStatus==="approved"||data.requestStatus==="rejected")?true:false}>Reject</button></td>
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
export default VeiwRequests