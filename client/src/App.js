
import { Routes,Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/layout/Navbar';
import Tours from './component/tours/Tours';
import Tour from './component/tour/Tour';
import Footer from './component/layout/Footer';
import Login from './component/auth/Login';


function App() {
  return (
    <>
    <Navbar/>
    
    <Routes>
    <Route path='/' element={<Tours/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/tours/:id' element={<Tour/>}/>
    </Routes>
   
    <Footer/>
    </>
  );
}

export default App;
