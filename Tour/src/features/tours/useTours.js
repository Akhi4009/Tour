import { useQuery } from "@tanstack/react-query";
import { getTours } from "../../services/apiTours";

export function useTours(){
 const {isLoading, data: tours, error} =  useQuery({
    queryFn:getTours,
    queryKey:['tours'],
 })

 return {isLoading,tours }
}