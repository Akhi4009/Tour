import { LOADING, LOGIN_SUCCESS, FAILURE, LOGOUT } from "./actionType";
import {getCookie} from "../../util/helper"

const initialState={
    isLoading:true,
    token:null,
    isError:false,
    user:null,
}

export const reducer=(state=initialState,{type,payload})=>{

    switch(type){

        case LOADING:
            return {...state,isLoading:true};
        
        case LOGIN_SUCCESS:
            return{...state,user:payload,isLoading:false,token:getCookie('token')};
        case FAILURE:
            return {...state,isError:true,isLoading:false};
        case LOGOUT:
            return {...state,isLoading:false,token:null,user:null};
        default:
            return state;
    }
}