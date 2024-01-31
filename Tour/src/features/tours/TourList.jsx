import React from 'react'
import { useTours } from './useTours'
import Spinner from '../../ui/Spinner';
import TourCard from './TourCard';
function TourList() {
    const {isLoading, tours} = useTours();
    if(isLoading) return <Spinner/>
  return (
    <div className='card-container'>
    {tours?.map(tour=>(
          <TourCard key={tour._id} tour={tour}/>
          ))} 
    </div>
    )
}
          
export default TourList
 
 
