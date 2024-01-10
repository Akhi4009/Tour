import { LOADING, LOGIN_SUCCESS, FAILURE, LOGOUT, UPDATE_USER, UPDATE_PASSWORD } from "./actionType";
import {getCookie} from "../../util/helper"

const initialState={
    isLoading:true,
    token:getCookie('token'),
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
            return {...state,isLoading:false,token:null,user:getCookie('token')};
        case UPDATE_USER, UPDATE_PASSWORD:
            return {...state,isLoading:false,user:payload};
        default:
            return state;
    }
}