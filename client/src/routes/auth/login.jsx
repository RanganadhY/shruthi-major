import React,{useState} from 'react'
import { useLocation } from 'react-router-dom';
import "../../css/authRoutesCss/login.css"
import {useNavigate} from "react-router-dom"
import axios from "../../axios/axios"
import loginSidePic from "../../assets/35126915.jpg"


function Login() {
    const [userName, setuserName] = useState();
    const [password, setpassword] = useState();
    const [loginType, setloginType] = useState()

    const navigate = useNavigate();

    
    
    const handleLogin = async(e)=>{
        e.preventDefault();
        try{
            if(loginType==="001"){
                await axios.post("/auth/admin-login",{
                    userName,
                    password,
                }).then((response)=>{
                    navigate("/admin-home",{state:response.data})
                }).catch((error)=>{
                    throw(error)
                })
            }
            else if(loginType==="002"){
                await axios.post("/auth/donor-login",{
                    userName,
                    password
                }).then((response)=>{
                    console.log(response)
                    navigate("/donor-home",{state:response.data})
                })
                .catch((error)=>{
                    throw(error)
                })
            }
            else if(loginType==="003"){
                await axios.post("/auth/recepient-login",{
                    userName,
                    password
                }).then((response)=>{
                    console.log(response)
                    navigate("/recepient-home",{state:response.data})
                })
                .catch((error)=>{
                    throw(error)
                })
            }
        }catch(error){
            if(error.response.status === 404){
                alert(error.response.data.message)
            }
            else if(error.response.status === 401){
                alert(error.response.data.message)
            }
            else{
                alert("Something went wrong")
            }
        }
    }   
    const handleRegister = async()=>{
        navigate("/register")
    }
    return (
        <>
            <div className="login-main-container">
                <div className="login-side-pic">
                    <img src={loginSidePic} alt="" />
                </div>
                <form action="">
                    <div><h2>Login Here!</h2></div>
                    <div>
                        <div className="opt-login">
                            <div className='opt-login-opt'>
                                <label htmlFor="">Admin</label>
                                <input 
                                    type="radio"
                                    name='loginType'
                                    value="001"
                                    checked={loginType==="001"}
                                    onChange={(e)=>setloginType(e.target.value)}
                                    />
                            </div>
                            <div className='opt-login-opt'>
                                <label htmlFor="">Donor</label>
                                <input 
                                    type="radio"
                                    name='loginType'
                                    value="002"
                                    checked={loginType==="002"}
                                    onChange={(e)=>setloginType(e.target.value)}
                                    />
                            </div>
                            <div className='opt-login-opt'>
                                <label htmlFor="">Recipent</label>
                                <input 
                                    type="radio"
                                    name='loginType'
                                    value="003"
                                    checked={loginType==="003"}
                                    onChange={(e)=>setloginType(e.target.value)}
                                    />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">User Name</label>
                        <input 
                            type="text"
                            value={userName}
                            onChange={(e)=>setuserName(e.target.value)}
                            />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e)=>setpassword(e.target.value)}
                            />
                    </div>
                    <div>
                        <button className='login-btn' onClick={handleLogin}>Login</button>
                    </div>
                    <div>
                        <button className='register-btn' onClick={handleRegister}>Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login