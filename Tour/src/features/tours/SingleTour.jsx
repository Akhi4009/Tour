import { useTour } from './useTour';
import Spinner from '../../ui/Spinner';
import Map from './Map';
import Review from './review/Review';
const SingleTour = () => {

   const {data:{data:tour} = {},isLoading} = useTour()
   if(isLoading) return <Spinner/>
   
   const { 
    name, duration,difficulty,ratingsAverage,
     startLocation,startDates,maxGoupSize,guides,description
     } 
     
     = tour;
   
  

  return (
    <>
    <section className="section-header">
    <div className="heading-box">
      <h1 className="heading-primary">
        <span>{name}</span>
        </h1>
      <div className="heading-box__group">
        <div className="heading-box__detail">
        
          <span className="heading-box__text">{duration} days</span>
        </div>
        <div className="heading-box__detail">
          
          <span className="heading-box__text">{startLocation.description}</span>
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
             <span className="overview-box__text">{startDates[0]} </span>
            </div>
            <div className="overview-box__detail">
              
              <span className="overview-box__label">Difficulty</span>
              <span className="overview-box__text">{difficulty}</span>
            </div>
            <div className="overview-box__detail">
             
              <span className="overview-box__label">Participants</span>
              <span className="overview-box__text">{maxGoupSize} people</span>
            </div>
            <div className="overview-box__detail">
             
              <span className="overview-box__label">Rating</span>
              <span className="overview-box__text">{ratingsAverage} / 5</span>
            </div>
          </div>
  
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
  
            {guides?.map(guide=>(
  
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
        <h2 className="heading-secondary ma-bt-lg">About {name}</h2>
        <p className="description__text">
          {description}
        </p>
       
      </div>
    </section>

 <section className="section-pictures">
    <div className="picture-box">
      <img
        className="picture-box__img picture-box__img--1"
        src="/tour-1-cover.jpg"
        alt="The Park Camper Tour 1"
      />
    </div>
    <div className="picture-box">
      <img
        className="picture-box__img picture-box__img--2"
        src="/tour-2-cover.jpg"
        alt="The Park Camper Tour 1"
      />
    </div>
    <div className="picture-box">
      <img
        className="picture-box__img picture-box__img--3"
        src="/tour-3-cover.jpg"
        alt="The Park Camper Tour 1"
      />
    </div>
</section>

<section className='section-map'>
<Map/>
</section>


<section className="section-reviews">
<Review/>
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
              {duration} days. 1 adventure. Infinite memories. Make it yours today!
            </p>
            <button className="btn btn--green span-all-rows">Book tour now!</button>
          </div>
        </div>
      </section>
</>
  )
}

export default SingleTour