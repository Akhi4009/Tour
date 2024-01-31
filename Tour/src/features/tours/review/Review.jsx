import { useTour } from '../useTour'
import ReviewCard from './ReviewCard'
import Spinner from '../../../ui/Spinner'

function Review() {
    const {data:{review:reviews} = {},isLoading} = useTour()

    if(isLoading) return <Spinner/>

  return (
    
    <div className="reviews">
    {reviews.map(review=>(
     <ReviewCard key={review._id} review={review}/>
     ))}
     </div>
  
   )
 }
 
 export default Review;

      
     