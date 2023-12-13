import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import {getTour} from "../redux/tour/action"
import Moment from "react-moment"
import Map from '../map/Map'

const Tour = () => {
  const dispatch=useDispatch()
  const {id} = useParams()
  const {tour}=useSelector(state=>state.tour)
  console.log(tour?.data.startLocation.coordinates)
  const startPoint = {
    type: 'Point',
    coordinates: [51.505, -0.09],
  };

  const startLocation = startPoint.coordinates;
  
  useEffect(()=>{

    dispatch(getTour(id))
  },[dispatch,id])


  return (
    <>
    <section className="section-header">
    <div className="heading-box">
      <h1 className="heading-primary">
        <span>{tour?.data.name}</span>
        
      </h1>
      <div className="heading-box__group">
        <div className="heading-box__detail">
        
          <span className="heading-box__text">{tour?.data.duration} days</span>
        </div>
        <div className="heading-box__detail">
          
          <span className="heading-box__text">{tour?.data.startLocation.description}</span>
        </div>
      </div>
    </div>
  </section>

  <section className="section-description">
    <div className="overview-box">
      <div>
        <div className="overview-box__group">
          <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
          <div className="overview-box__detail">
            
            <span className="overview-box__label">Next date</span>
           <span className="overview-box__text"><Moment format='YYYY/MM/DD'>{tour?.data.startDates[0]}</Moment> </span>
          </div>
          <div className="overview-box__detail">
            
            <span className="overview-box__label">Difficulty</span>
            <span className="overview-box__text">{tour?.data.difficulty}</span>
          </div>
          <div className="overview-box__detail">
           
            <span className="overview-box__label">Participants</span>
            <span className="overview-box__text">{tour?.data.maxGoupSize} people</span>
          </div>
          <div className="overview-box__detail">
           
            <span className="overview-box__label">Rating</span>
            <span className="overview-box__text">{tour?.data.ratingsAverage} / 5</span>
          </div>
        </div>

        <div className="overview-box__group">
          <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>

          {tour?.data.guides?.map(guide=>(

            <div key={guide._id} className="overview-box__detail">
            <img
              src="img/users/user-19.jpg"
              alt="Lead guide"
              className="overview-box__img"
            />
            <span className="overview-box__label">{guide.role}</span>
            <span className="overview-box__text">{guide.name}</span>
          </div>
          ))}
          
          
        </div>
      </div>
    </div>

    <div className="description-box">
      <h2 className="heading-secondary ma-bt-lg">About {tour?.data.name}</h2>
      <p className="description__text">
        {tour?.data.description}
      </p>
     
    </div>
  </section>

{/*//  <section className="section-pictures">
//     <div className="picture-box">
//       <img
//         className="picture-box__img picture-box__img--1"
//         src="img/tour-5-1.jpg"
//         alt="The Park Camper Tour 1"
//       />
//     </div>
//     <div className="picture-box">
//       <img
//         className="picture-box__img picture-box__img--2"
//         src="img/tour-5-2.jpg"
//         alt="The Park Camper Tour 1"
//       />
//     </div>
//     <div className="picture-box">
//       <img
//         className="picture-box__img picture-box__img--3"
//         src="img/tour-5-3.jpg"
//         alt="The Park Camper Tour 1"
//       />
//     </div>
          //           </section>*/}

    <section style={{height:20}}>
    
  
    
    </section>


  <section className="section-reviews">
    <div className="reviews">

    {tour?.review.map(review=>(

      <div key={review._id} className="reviews__card">
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
    <div className="reviews__rating">

    

   {[1,2,3,4,5].map(ele=>(

    <svg key={ele}  width="20" height="20"   className={`bi bi-star reviews__star reviews__star--${ele>review.rating?'iactive':'active'}`} viewBox="0 0 16 16">
   <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
     </svg>
   ))}
     
     </div>
      </div>

    ))}
      
     
    </div>
  </section>

  <section className="section-cta">
    <div className="cta">
      <div className="cta__img cta__img--logo">
        <img src="img/logo-white.png" alt="Natours logo" className="" />
      </div>
      <img src="img/tour-5-2.jpg" alt="" className="cta__img cta__img--1" />
      <img src="img/tour-5-1.jpg" alt="" className="cta__img cta__img--2" />

      <div className="cta__content">
        <h2 className="heading-secondary">What are you waiting for?</h2>
        <p className="cta__text">
          {tour?.data.duration} days. 1 adventure. Infinite memories. Make it yours today!
        </p>
        <button className="btn btn--green span-all-rows">Book tour now!</button>
      </div>
    </div>
  </section>
 
    </>
  )
}

export default Tour