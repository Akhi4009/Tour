import  { useEffect } from 'react'
import { getCookie } from '../utils/helper'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const token =getCookie("token");
    const navigate = useNavigate();

    useEffect(()=>{
        if(token === null) navigate("/login");
    },[token,navigate]);
   
  return children;
}

export default ProtectedRoute