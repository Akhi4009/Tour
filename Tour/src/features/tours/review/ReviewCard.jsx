import ReviewRating from './ReviewRating'

function ReviewCard({review}) {

  return (
    <div className="reviews__card">
    <div className="reviews__avatar">
      <img
        src="img/users/user-7.jpg"
        alt={review.user.name}
        className="reviews__avatar-img"
      />
      <h6 className="reviews__user">{review.user.name}</h6>
    </div>
    <p className="reviews__text">
      {review.review}
    </p>
   <ReviewRating rating={review.rating}/>
  </div>
  )
}

export default ReviewCard