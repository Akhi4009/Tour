import {LOADING, LOGIN_SUCCESS, FAILURE, LOGOUT} from "./actionType"
import axios from "axios";
import { deleteCookie, setCookie } from "../../util/helper";





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

export const logOut= () => dispatch =>{
    deleteCookie('token');
    dispatch({type:LOGOUT});
}