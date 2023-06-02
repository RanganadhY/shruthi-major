import React ,{useState,useEffect}from 'react'
import { useLocation,useNavigate,useParams } from 'react-router-dom';
import "../../css/donationpage.css"
import Web3 from "web3";
import axios from "../../axios/axios"
import { adminWalletId } from '../../env/env';
const CONTRACT_ADDRESS = "0xFfa28880647FDAA98f1e6e92Cfd0671D316122f6"
const CONTRACT_ABI = '[{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"donate","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTotalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDonations","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"helloworld","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"num","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userDonations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'

function Donation() {

    const navigate = useNavigate();
    const {userName,requestNumber} = useParams();
    console.log(requestNumber)

    const [amount, setamount] = useState()
    const [hashdisplay, sethashdisplay] = useState();
    const [blockHash, setblockHash] = useState();
    const [gasused, setgasused] = useState()

    // const [donationAmount, setdonationAmount] = useState();
    const [accountBalance, setaccountBalance] = useState();

    const [requestDetails, setrequestDetails] = useState()

    const {state} = useLocation();
    console.log(state)

    const web3 = new Web3(window.ethereum);
    const handleTransfer = async (donationAmount,recepientMetamaskAddress,accountBalance) => {
        try {
            if(accountBalance<donationAmount){
                alert("Insuffiecient Balence")
            }
            else{
                // Prompt user to connect to MetaMask
                await window.ethereum.enable();
            
                // Get the sender's account
                const accounts = await web3.eth.getAccounts();
                const fromAccount = accounts[0];
                console.log(typeof donationAmount)
                // Create the transaction object
                const amount = web3.utils.toWei(String(donationAmount), 'ether'); // the amount to send in wei
                const gasLimit = await web3.eth.getBlock('latest').gasLimit;
                const gasPrice = await web3.eth.getGasPrice();
                
                const txObject = {
                    from: fromAccount,
                    to: recepientMetamaskAddress,
                    value: amount,
                    gasLimit: gasLimit,
                    gasPrice: gasPrice,
                };
                const txDetails = await web3.eth.sendTransaction(txObject);
                const savingRes = await axios.post("/api/tx/add-tx/",{
                    "userType":"002",
                    "userName":userName,
                    "txHash":txDetails.transactionHash,
                    "gasFee":txDetails.gasUsed,
                    "txAmount":donationAmount,
                    "dateOfTx":new Date(),
                    requestNumber
                })
                const detailSavingRes = axios.post("/api/donor/save-donation-details",{
                    "recivedAmount":donationAmount,
                    "recivedMetamaskAddr":recepientMetamaskAddress,
                    requestNumber,
                    userName
                })
                console.log('Transaction hash:', txDetails);
                alert("Donation Sucessfull")
            }
        } catch (e) {
            console.error(e);
            alert("Something went wrong")
        }
    };
    useEffect(()=>{
        getBalance()
        async function getBalance(){
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            const balanceInWei = await web3.eth.getBalance(account);
            setaccountBalance(web3.utils.fromWei(balanceInWei, 'ether'));
        }
    },[]);

    useEffect(()=>{
        fetchDonationDetails()
        async function fetchDonationDetails(){
            const response = await axios.get(`/api/donor/get-donation-details/${requestNumber}`)
            setrequestDetails(response.data.donationDetails)
            console.log(response.data.donationDetails)
        }
    },[])
    const handlemakeDonation = async()=>{
        await window.ethereum.request({method:'eth_requestAccounts'});
        window.web3 = new Web3(window.ethereum);
        // const accounts = await window.web3.eth.getAccounts()
        const accounts = await window.ethereum.enable()
        console.log(accounts[0])
        const contract = await new window.web3.eth.Contract(JSON.parse(CONTRACT_ABI),CONTRACT_ADDRESS)
        console.log(contract)
        await contract.methods.donate(amount).send({from :accounts[0]})
        .then(async(res)=>{
            const details = {
                "amount":amount,
                "hash":res.transactionHash,
                "dateOfTx":new Date(),
                "userName":state.userDetails.userName,
                "gasFee":res.gasUsed
            }
            console.log(res)
            sethashdisplay(res.transactionHash);
            setblockHash(res.blockHash)
            setgasused(res.gasUsed)
            await axios.post("/store",details)
            .then(()=>{
                alert("transaction sucessfull")
                console.log(hashdisplay)
            })
            
        })

        const message = await contract.methods.getTotalDonation().call({from :accounts[0]})
        console.log("total donantion", message)
    }

    const donationHistory = async()=>{
        navigate(`/donations-history/${userName}`)
    }

    const handleBack = async()=>{
        navigate(`/${userName}/view-donation-requests`)
    }

    return (
        <div className='donation-page-design'>
            <div className='userName'>
                {userName}
            </div>
            {requestDetails
            &&
            <div className="detail-wrapper">
                <div className="details-container">
                    <div className='label-input'>
                        <label htmlFor="">Account Balance(in Ether)</label>
                        <input 
                            type="text" 
                            value={accountBalance}
                            readOnly
                        />
                    </div>
                    <div className='label-input'>
                        <label htmlFor="">Min Donation Amount</label>
                        <input 
                            value={requestDetails.afterMinAmount}
                            readOnly
                            // onChange={(e)=>setdonationAmount(e.target.value.toString())}
                            type="text" />
                    </div>
                    <div className='donar_button'>
                        <button
                        onClick={()=>handleTransfer(requestDetails.afterMinAmount,requestDetails.recepientMetamaskAddress,accountBalance)}
                            >Make the Donation</button>
                    </div>
                    <div className='donar_button'>
                        <button 
                        onClick={donationHistory}
                            >Donation History</button>
                    </div>
                    {/* <div>
                        <p>{hashdisplay?"Your tx hash:":""}</p>
                        <p>{hashdisplay}</p>
                    </div>
                    <div>
                        <p>{blockHash?"Your tx block hash:":""}</p>
                        <p>{blockHash}</p>
                    </div>
                    <div>
                        <p>{gasused?"Your tx gas used:":""}</p>
                        <p>{gasused}</p>
                    </div> */}

                </div>
                <div className='vp-go-back-btn'>
                    <button  onClick={handleBack}>Go Back</button>
                </div>
            </div>
}
        </div>
    )
}

export default Donation