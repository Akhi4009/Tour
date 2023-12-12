import React from 'react'
import Moment from "react-moment"
import {Link} from "react-router-dom"

const TourCard = ({tour}) => {

    const {
        name,difficulty,
        duration,summary,
        ratingsAverage,
        ratingsQuantity,
        price,maxGroupSize,createdAt,_id
    }=tour
  return (
    <>
    <div className="card">
          <div className="card__header">
            <div className="card__picture">
              <div className="card__picture-overlay">&nbsp;</div>
              <img
                src="img/tour-1-cover.jpg"
                alt="Tour 1"
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
                
              </svg>
              <span>Banff, Canada</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                
              </svg>
              <span><Moment format='yyyy/MM'>{createdAt}</Moment></span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                
              </svg>
              <span>3 stops</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
               
              </svg>
              <span>{maxGroupSize} people</span>
            </div>
          </div>

          <div className="card__footer">
            <p>
              <span className="card__footer-value">${price}</span>
              <span className="card__footer-text">per person</span>
            </p>
            <p className="card__ratings">
              <span className="card__footer-value">{ratingsAverage}</span>
              <span className="card__footer-text">rating ({ratingsQuantity})</span>
            </p>
            <Link to={`/tours/${_id}`} className="btn btn--green btn--small">Details</Link>
          </div>
        </div>
    </>
  )
}

export default TourCard