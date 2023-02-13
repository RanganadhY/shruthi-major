import React ,{useState,useEffect}from 'react'
import "../css/donation.css"
import Web3 from "web3";
import axios from "../axios/axios"
const CONTRACT_ADDRESS = "0x2B0f0eAA0135DD908cA2027809cdBA0C2336B87b"
const CONTRACT_ABI = '[{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"donate","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTotalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDonations","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"helloworld","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"num","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userDonations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'
function Donation() {

    const [name, setname] = useState()
    const [amount, setamount] = useState()
    const [hashdisplay, sethashdisplay] = useState();
    const [blockHash, setblockHash] = useState();
    const [gasused, setgasused] = useState()


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
                "hash":res.transactionHash
            }
            console.log(res)
            sethashdisplay(res.transactionHash);
            setblockHash(res.blockHash)
            setgasused(res.gasUsed                )
            await axios.post("/store",details)
            .then(()=>{
                alert("transaction sucessfull")
                console.log(hashdisplay)
            })
            
        })

        const message = await contract.methods.getTotalDonation().call({from :accounts[0]})
        console.log("total donantion", message)
    }

    return (
        <div>
            <div className="detail-wrapper">
                <div className="details-container">
                    <div>
                        <label htmlFor="">Name</label>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e)=>setname(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="">Donation Amount</label>
                        <input 
                            value={amount}
                            onChange={(e)=>setamount(e.target.value)}
                            type="text" />
                    </div>
                    <div>
                        <button
                        onClick={handlemakeDonation}
                            >Make the Donation</button>
                    </div>
                    <div>
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
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Donation