import { setCookie, getCookie, deleteCookie } from "../utils/helper";
import axios from "axios";

const token = getCookie("token");
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', 
        },
      };


export async function login(data){

    try {
        const res= await axios.post(`http://localhost:4500/api/users/login`,data)
        if(res.data.token) setCookie('token',res.data.token,10);

        return res.data.user;
    }catch (err){
        console.log(err);
        throw new Error("There was an error in login. Please check your email and password");
    } 
}

export async function getUser(){
    try {
        const res= await axios.get(`http://localhost:4500/api/users/me`,config)
        return res.data.data.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}

export function logout(){
    deleteCookie("token");
}

export async function updateCurrentUser(data){

   
    try {
        let res;
        if(!data.password){
            console.log(data);
         res= await axios.patch(`http://localhost:4500/api/users/updateme`,data,config);
        }else{
         res= await axios.patch(`http://localhost:4500/api/users/updatepassword`,data,config);
        }

        if(res.data.token){
           deleteCookie("token")
           setCookie('token',res.data.token,10);
        }
        return res.data;
    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong try again");
    }
}