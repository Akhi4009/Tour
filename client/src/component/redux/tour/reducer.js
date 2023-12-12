import { GET_TOUR, GET_TOURS } from "./actionType";

const initialState={
    isLoading:true,
    tours:[],
    tour:null
}

export const reducer=(state=initialState,{type,payload})=>{

    switch(type){

        case GET_TOURS:
            return {...state,tours:payload,isLoading:false}
        
        case GET_TOUR:
            return{...state,tour:payload,isLoading:false}
        default:
            return state;
    }
}
