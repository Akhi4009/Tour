import {useMutation, useQueryClient} from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout(){
  
    const queryClient = useQueryClient()
 const {mutate:logout, isLoading} = useMutation({
    mutationFn:logoutApi,
    onSuccess:()=>{
        queryClient.removeQueries(['user']);
        toast.success("logout successfully");
    },
    onError:()=>toast.error("Something went wrong try again")
})

return {logout, isLoading}
}