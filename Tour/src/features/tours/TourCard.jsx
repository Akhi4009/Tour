
import {Link} from "react-router-dom"
import {format} from "date-fns"
import { HiCalendar, HiLocationMarker, HiStop, HiUser } from "react-icons/hi"
import { formatCurrency } from "../../utils/helper"



const TourCard = ({tour}) => {

    const {
        name,difficulty,
        duration,summary,
        ratingsAverage,
        ratingsQuantity,
        price,maxGroupSize,_id,imageCover,startDates
    }=tour
    const image = `/img/tours/${imageCover}`
   
   
  return (
    <>
        <div className="card">
          <div className="card__header">
            <div className="card__picture">
              <div className="card__picture-overlay">&nbsp;</div>
              <img
                src={image}
                alt={name}
                className="card__picture-img"
              />
            </div>

            <h3 className="heading-tertirary">
              <span>{name}</span>
            </h3>
          </div>

          <div className="card__details">
            <h4 className="card__sub-heading">{difficulty} {duration}-day tour</h4>
            <p className="card__text">
             {summary}
            </p>
            <div className="card__data">
              <svg className="card__icon">
                <HiLocationMarker/>
              </svg>
              <span>{tour.startLocation.description}</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <HiCalendar/>
              </svg>
             <span> {format(startDates[0], "MMM dd yyyy")} </span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <HiStop/>
              </svg>
              <span>{tour.locations.length} stops</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
              <HiUser/>
              </svg>
              <span>{maxGroupSize} people</span>
            </div>
          </div>

          <div className="card__footer">
            <p>
              <span className="card__footer-value">{formatCurrency(price)}</span> {" "}
              <span className="card__footer-text">per person</span>
            </p>
            <p className="card__ratings">
              <span className="card__footer-value">{ratingsAverage}</span>{" "}
              <span className="card__footer-text">rating ({ratingsQuantity})</span>
            </p>
            <Link to={`/tour/${_id}`} className="btn btn--green btn--small">Details</Link>
          </div>
        </div>
    </>
  )
}

export default TourCard