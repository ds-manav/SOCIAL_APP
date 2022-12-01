import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar.component";
import './Regestration.style.css'
import { regestrationActions } from "../../store/RegestrationSlice";
import { useDispatch, useSelector } from "react-redux";
import { resgestrationReducer,regSlice } from "../../store/RegestrationSlice";
const Regestration = ()=>{
   
    const navigate = useNavigate();
    // submit function
    // const id = 0;
    const userdetails = useSelector((state)=> state.rege.userdata);
    console.log(userdetails)
    const dispatch = useDispatch();
    const randomNumberInRange=(min, max)=> {
        return Math.round(Math.random() * (max - min + 1)) + min;
      }
      const [status,setStatus] = useState();
    async function handleSubmit(){
        await dispatch(regestrationActions.setUserid(randomNumberInRange(1,1000)));
        const posturl = `http://localhost:8000/api/users/`;
        const postdata = await axios.post(posturl,userdetails).then(response =>{
               setStatus(response.status);
        })
        if(status == 201){
            // localStorage.setItem("users",JSON.stringify(userdetails));
            alert("You are successefully registered");
            navigate('/')
            window.location.reload(true);
        }
        else if(status== 205){
            alert("Username already registered");
        }
    
    
     }
     

    return(
        <div>
            {/* <h1>{userdetails}</h1> */}
            <div className="container">
                <div className="innercontainer">
                    <h1>SignUp</h1>
                    <input  className="inputcontainer" type="text" value={userdetails.name} placeholder="Username" onChange={(e)=>{
                            dispatch(regestrationActions.setUsername(e.target.value));
                    }}/>
                    <input  className="inputcontainer" type="Email" value = {userdetails.email} placeholder="Email" onChange={(e)=>{
                            dispatch(regestrationActions.setUseremail(e.target.value));
                    }}/>
                    <input type="password" className="inputcontainer"  value={userdetails.pass} placeholder="Password" onChange={(e)=>{
                            dispatch(regestrationActions.setUserPassword(e.target.value));
                    }}/>
                    <div className="submitbutton">
                    <button id="submit" onClick={handleSubmit}>Submit</button>
                </div>
                </div>
                
            </div>
        </div>
    )
}
export default Regestration