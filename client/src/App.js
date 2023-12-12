
import { Routes,Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/layout/Navbar';
import Tours from './component/tours/Tours';
import Tour from './component/tour/Tour';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Tours/>}/>
    <Route path='/tours/:id' element={<Tour/>}/>
    </Routes>
    </>
  );
}

export default App;
