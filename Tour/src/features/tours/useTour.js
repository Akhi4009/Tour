import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTour } from "../../services/apiTours";

export function useTour(){
     const {tourId} = useParams();
        
     const {isLoading, data, error} = useQuery({
            queryKey:['tour',tourId],
            queryFn: ()=>getTour(tourId),
            retry:false,
          })
    
    return {isLoading, data, error}
}


