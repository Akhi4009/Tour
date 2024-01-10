import {LOADING, LOGIN_SUCCESS, FAILURE, LOGOUT, UPDATE_USER, UPDATE_PASSWORD} from "./actionType"
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "../../util/helper";

const token =getCookie('token');
const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', 
    },
  };





// Login

export const logIn=(data)=>async dispatch=>{

    dispatch({type:LOADING});
    try {
        const res= await axios.post(`http://localhost:4500/api/users/login`,data)
       
        console.log(res.data);

        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data.user
        })
        if(res.data.token) setCookie('token',res.data.token,10);
    } catch (error) {
        dispatch({
            type:FAILURE
        })
        console.log(error)
        
    }

}

// Logout

export const logOut= () => dispatch =>{
    deleteCookie('token');
    dispatch({type:LOGOUT});
}


// Update user
export const updateUser = (data) => async dispatch =>{
   
    dispatch({type:LOADING});
    try {
        const res= await axios.patch(`http://localhost:4500/api/users/updateme`,data,config);
       
        console.log(res.data);

        dispatch({
            type:UPDATE_USER,
            payload:res.data.user
        })
        
    } catch (error) {
        dispatch({
            type:FAILURE
        })
        console.log(error)
        
    }
}

export const updatePassword = (data) => async dispatch =>{
   
    dispatch({type:LOADING});
    try {
        const res= await axios.patch(`http://localhost:4500/api/users/updatepassword`,data,config);
       
        console.log(res.data);

        dispatch({
            type:UPDATE_PASSWORD,
            payload:res.data.user
        })
        
    } catch (error) {
        dispatch({
            type:FAILURE
        })
        console.log(error)
        
    }
}