import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { addSpot, uploadImage } from "../../store/spot"
import { getSpot } from "../../store/spot"


const CreateSpotForm = () => {
   const {id} = useParams()
   const sessionUser = useSelector(state => state.session.user)
   const dispatch = useDispatch()
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
   const [imageUrl, setImageUrl] =useState(false)
   const [imagePreview, setImagePreview] =useState(false)
   console.log(sessionUser, '1111')
   console.log(imageUrl)

   const updateImage = async (e) => {
   const file = e.target.files[0];
   if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
         setImagePreview(reader.result);
      };
      setImageUrl(file);
    } else {
      setImagePreview(false);
    }
  };
   
   const handleSubmit = async (e) => {
      e.preventDefault()

      const spot = await dispatch(addSpot({
         user_id: sessionUser?.id,
         address,
         city,
         state,
         country, 
         name, 
         price,
         description,
         guest,
         bathroom,
         bedroom,
         
      }))
      
      if (spot?.id) {
         const upload= await dispatch(uploadImage(imageUrl, spot.id))
      }
      if (spot?.errors) {
         setErrors(spot?.errors)
         return 
      } else {
         history.push(`/spots/${spot.id}`)
      }
   }
   
   
   return (
      <div className='create-spot-page-container'>
         <div>
            <h1>Host a spot on LuxBnB</h1>
         </div>

         <form className='spot-form-container' onSubmit={handleSubmit}>
            <div className="spot-form-image-container">
               <label>Image</label>
                  <input
                  type="file"
                  name="image"
                  accept=".jpg, .jpeg, .png"
                  onChange={updateImage}
                  // required
                  ></input>
            </div>
            {imagePreview && <img src={imagePreview} />}
            <div>
               <label>Name</label>
               <input
                  type='text'
                  label='Name'
                  placeholder='Name'
                  name='name'
                  onChange={(e) =>setName(e.target.value)}
                  value={name}
               />
            </div>
               <div>
                  <label>Address</label>
                  <input 
                     label='Address'
                     placeholder='Address'
                     name='address'
                     onChange={(e) =>setAddress(e.target.value)}
                     value={address}
                  />
               </div>
               <div>
                  <label>City</label>
                  <input 
                     label='City'
                     placeholder='City'
                     name='city'
                     onChange={(e) =>setCity(e.target.value)}
                     value={city}
                  />
               </div>
               <div>
                  <label>State</label>
                  <select
                     type="select"
                     onChange={(e) => setState(e.target.value)}
                  >
                     <option  selected disabled hidden >Select a State</option>
                     <option value="Alabama">Alabama</option>
                     <option value="Alaska">Alaska</option>
                     <option value="Arizona">Arizona</option>
                     <option value="Arkansas">Arkansas</option>
                     <option value="California">California</option>
                     <option value="Colorado">Colorado</option>
                     <option value="Connecticut">Connecticut</option>
                     <option value="Delaware">Delaware</option>
                     <option value="District Of Columbia">District Of Columbia</option>
                     <option value="Florida">Florida</option>
                     <option value="Georgia">Georgia</option>
                     <option value="Hawaii">Hawaii</option>
                     <option value="Idaho">Idaho</option>
                     <option value="Illinois">Illinois</option>
                     <option value="Indiana">Indiana</option>
                     <option value="Iowa">Iowa</option>
                     <option value="Kansas">Kansas</option>
                     <option value="Kentucky">Kentucky</option>
                     <option value="Louisiana">Louisiana</option>
                     <option value="Maine">Maine</option>
                     <option value="Maryland">Maryland</option>
                     <option value="Massachusetts">Massachusetts</option>
                     <option value="Michigan">Michigan</option>
                     <option value="Minnesota">Minnesota</option>
                     <option value="Mississippi">Mississippi</option>
                     <option value="Missouri">Missouri</option>
                     <option value="Montana">Montana</option>
                     <option value="Nebraska">Nebraska</option>
                     <option value="Nevada">Nevada</option>
                     <option value="New Hampshire">New Hampshire</option>
                     <option value="New Jersey">New Jersey</option>
                     <option value="New Mexico">New Mexico</option>
                     <option value="New York">New York</option>
                     <option value="North Carolina">North Carolina</option>
                     <option value="North Dakota">North Dakota</option>
                     <option value="Ohio">Ohio</option>
                     <option value="Oklahoma">Oklahoma</option>
                     <option value="Oregon">Oregon</option>
                     <option value="Pennsylvania">Pennsylvania</option>
                     <option value="Rhode Island">Rhode Island</option>
                     <option value="South Carolina">South Carolina</option>
                     <option value="South Dakota">South Dakota</option>
                     <option value="Tennessee">Tennessee</option>
                     <option value="Texas">Texas</option>
                     <option value="Utah">Utah</option>
                     <option value="Vermont">Vermont</option>
                     <option value="Virginia">Virginia</option>
                     <option value="Washington">Washington</option>
                     <option value="West Virginia">West Virginia</option>
                     <option value="Wisconsin">Wisconsin</option>
                     <option value="Wyoming">Wyoming</option>
                  </select>
               </div>
               <div>
                  <label>Country</label>
                  <select
                     type="select"
                     onChange={(e) => setCountry(e.target.value)}
                  >
                     <option value="none" selected disabled hidden >Select a Country</option>
                     <option value="United States">Unites States</option>
                  </select>
               </div>
               <div>
                  <label>Price</label>
                  <input 
                     type='number'
                     label='Price'
                     placeholder='Price per night'
                     name='price'
                     onChange={(e) =>setPrice(e.target.value)}
                     value={price}
                  />
               </div>
               <div>
                  <label>Guests</label>
                  <input 
                     type='number'
                     label='Guest'
                     placeholder='Guests'
                     name='guest'
                     onChange={(e) =>setGuest(e.target.value)}
                     value={guest}
                  />
               </div>
               <div>
                  <label>Bedrooms</label>
                  <input 
                     type='number'
                     label='Bedroom'
                     placeholder='Bedrooms'
                     name='bedroom'
                     onChange={(e) =>setBedroom(e.target.value)}
                     value={bedroom}
                  />
               </div>
               <div>
                  <label>Bath</label>
                  <input 
                     label='bathroom'
                     placeholder='Bathrooms'
                     name='bathroom'
                     onChange={(e) =>setBathroom(e.target.value)}
                     value={bathroom}
                  />
               </div>
               <div>
                  <label>Description</label>
                  <textarea
                     name='description'
                     placeholder='Provide a Description'
                     onChange={(e) => setDescription(e.target.value)}
                     value = {description}
                  />
               </div>

               <div className="spot-form-submit">
                  {/* <button type='button' onClick={addImage}>Add Image</button> */}
                  <button className="spot-form-button" type="submit">Add Spot</button >
               </div>
         </form>
      </div>
   )

}

export default CreateSpotForm 