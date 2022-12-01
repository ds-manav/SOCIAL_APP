import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { regestrationActions } from "../../store/RegestrationSlice";
import NavBar from "../NavBar/NavBar.component";
import './Login.style.css'

const Login = ({props,route,navigation})=>{
    const navigate = useNavigate();
    const userdetails = useSelector((state)=>state.rege.userdata);
    const dispatch = useDispatch();
    const [response,setResponse] = useState();
    const [status,setStatus] = useState();



    // Loggin Function
    async function handleLogin(){
        const posturl = `http://localhost:8000/api/login/`;
        const data =  axios.post(posturl,userdetails).then(response =>{
             setResponse(response.data);
             setStatus(response.status);
        });
        if(status === 202){
            const user = {id:response.id,username:response.username,email:response.email} 
            localStorage.setItem("users",JSON.stringify(user));
            console.log(JSON.parse(localStorage.getItem("users")));
            alert("User is successfully logged in");
            navigate('/')
            window.location.reload(true);
        }
        
        else{
            console.log("Incorrect Credentials")
            // navigate('/admin',{state:{userstatus:userstatus}})
        }
        


    }
    return (
        <div className="logincontainer">
            <NavBar/>
            <div className="logininput">
                <h1>Login</h1>
                <input className="uservalues" type="email" placeholder="Email" value={userdetails.email} onChange={(e)=>{
                    dispatch(regestrationActions.setUseremail(e.target.value));
                }}/>
                <input className="uservalues" type="password" placeholder="Password" value={userdetails.password} onChange={(e)=>{
                    dispatch(regestrationActions.setUserPassword(e.target.value));
                }}/>
            <div className="login">
                <button id = "loginbtn" onClick={handleLogin}>Login</button>
                <button id = "loginbtn" onClick={()=>{
                    navigate('/register')
                }}>SignUp</button>
            </div>
            </div>
            

        </div>
    )
}
export default Login;