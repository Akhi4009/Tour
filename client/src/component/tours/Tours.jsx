import {useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTours } from '../redux/tour/action'
import TourCard from './TourCard'

const Tours = () => {

  const dispatch=useDispatch()
  const {tours} =useSelector(state=>state.tour)
  
  useEffect(()=>{

    dispatch(getTours())
  },[dispatch])
  return (
    <main className='main'>
    <div className='card-container'>
   {tours?.map(tour=>(
      <TourCard key={tour._id} tour={tour}/>
   ))} 
    </div>

    </main>
  )
}

export default Tours