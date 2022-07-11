import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getSpot } from "../../store/spot"
import { editSpot } from "../../store/spot"

const EditSpot = () => {
   const dispatch = useDispatch()
   const sessionUser = useSelector(state => state.session.user)
   const history = useHistory()
   const [address, setAddress] = useState("")
   const [city, setCity] = useState("")
   const [state, setState] = useState("")
   const [country, setCountry] = useState("")
   const [name, setName] = useState("")
   const [price, setPrice] = useState("")
   const [description, setDescription] = useState("")
   const [guest, setGuest] = useState("")
   const [bathroom, setBathroom] = useState("")
   const [bedroom,setBedroom] =useState("")
   const [errors, setErrors] =useState([])



   return ( 
      <div>
      </div>
   )
}


export default EditSpot