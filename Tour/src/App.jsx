import { BrowserRouter ,Routes, Route, Navigate} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {Toaster} from "react-hot-toast"


import Tours from "./pages/Tours";
import AppLayout from "./ui/AppLayout";
import Tour from "./pages/Tour";
import Account from "./pages/Account";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
   queries: {
    staleTime:60 * 1000,
   } 
  }
})
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false}/>
    <BrowserRouter>
    <Routes>
    <Route element={
      <AppLayout/>
      
      }
      >
    <Route index element={<Navigate replace
    to="tour"/>}/>
    <Route path="tour" element={<Tours/>}/>
    <Route path="tour/:tourId" element={<Tour/>}/>
    
    <Route path="account" element={<ProtectedRoute>
      <Account/>
      </ProtectedRoute>}/>
    </Route>
    <Route path="login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    <Toaster 
    position="top-center" gutter={12}
    containerStyle={{margin:"8px"}}
    toastOptions={{
      success:{
        duration:3000
      },
      error:{
        duration:5000,
      },
      style:{
        fontSize:"16px",
        maxWidth:"500px",
        padding:"16px 24px",
        backgroundColor:"var(--color-grey-0)",
        color:"var(--color-grey-700)"
      }
    }}
    />
    </QueryClientProvider>
  )
}


export default App
