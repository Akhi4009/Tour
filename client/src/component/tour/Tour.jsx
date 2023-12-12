import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import {getTour} from "../redux/tour/action"
const Tour = () => {
  const dispatch=useDispatch()
  const {id} = useParams()
  const tour=useSelector(state=>state.tour)
  useEffect(()=>{

    dispatch(getTour(id))
  },[dispatch,id])
  return (
    <div>Tour</div>
  )
}

export default Tour