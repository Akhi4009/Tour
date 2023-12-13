import { GET_TOURS,GET_TOUR } from "./actionType";
import axios from "axios"

//get all tour


export const getTours=()=>async dispatch=>{

    try {
        const res= await axios.get(`http://localhost:4500/api/tours`)
       
        
        dispatch({
            type:GET_TOURS,
            payload:res.data.data
        })
    } catch (error) {

        console.log(error)
        
    }

}

//get Single Tour


export const getTour=(id)=>async dispatch=>{
    // console.log(id)

    try {
        const res= await axios.get(`http://localhost:4500/api/tours/${id}`)
        // console.log(res)
        
        
        dispatch({
            type:GET_TOUR,
            payload:res.data.data
        })
    } catch (error) {

        console.log(error)
        
    }

}