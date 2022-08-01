import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getSpot, editSpot } from "../../store/spot"
import { uploadImage, removeImage } from "../../store/spot"
import ImageUploading from 'react-images-uploading'
import './EditSpot.css'

const EditSpot = ({ setShowModal }) => {
   const dispatch = useDispatch()
   const sessionUser = useSelector(state => state.session.user)
   const {id} = useParams()
   const spot = useSelector(state =>state.spotReducer[id])
   const history = useHistory()
   const [address, setAddress] = useState(spot.address)
   const [city, setCity] = useState(spot.city)
   const [state, setState] = useState(spot.state)
   const [country, setCountry] = useState(spot.country)
   const [name, setName] = useState(spot.name)
   const [price, setPrice] = useState(spot.price)
   const [description, setDescription] = useState(spot.description)
   const [guest, setGuest] = useState(spot.guest)
   const [bathroom, setBathroom] = useState(spot.bathroom)
   const [bedroom,setBedroom] =useState(spot.bedroom)
   const [errors, setErrors] =useState([])

   const [images, setImages] =useState('')
   const [imageRemove, setImageRemove]=useState([])
   const [isLoaded, setIsLoaded] = useState(false); 

   // console.log('spooooot',  spot )
   console.log('removethis',imageRemove)
   // console.log('yoooooo', spot.images)



   useEffect(async () => {
      dispatch(getSpot(id));
      let images = spot?.images.map((image) => {
         return { 'data_url': image['image'], 'id': image['id'] };
      })
      console.log('images', images)
      setImages(images)
      if (spot) {
         setIsLoaded(true)
      }
   },[dispatch])

   const multiUpload = async (images, spotId) => {

      for(let i = 0; i<imageRemove.length; i++) {
         await dispatch(removeImage(imageRemove[i]))
      }

      for (let i = 0; i<images.length; i++) {
         let image = images[i];

         let newFile = false;
         let file;

         if (image.file) {
         newFile = true;
         file = image.file;
         } else {
         file = image.data_url;
         }
         await dispatch(uploadImage(file, spotId))
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
   
      const edit = await dispatch(editSpot({
         id: spot.id,
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

      if(edit.id) {
         await multiUpload(images, spot.id)
         await dispatch(editSpot(edit))
         history.push(`/spots/${spot?.id}`)
      }
      if (edit.errors) {
         setErrors(edit?.errors)
         return
      } else  {
         setShowModal(false)
      }
      }    

   const handleExpress = (e) => {
      if (e.key === 'e') return e.preventDefault()
      if (e.key === 'E') return e.preventDefault()
      if (e.key === '+') return e.preventDefault()
      if (e.key === '-') return e.preventDefault()
      if (e.key === '.') return e.preventDefault()
   }


   return ( 
         <div className='edit-spot-page-container'>
            <div className='create-spot-name-container'>
               <h1 className='create-spot-name'>Edit Your Spot!</h1>
            </div>

         <div className='error-container'>
            {errors.length > 0 && (
               <div className='create-spot-form-error-container'>
               <span className="error-title">The following errors occured:</span>
               {errors.length && errors.map((error, ind) => (
                  <li className='error-list' key={ind}>{error}</li>
               ))}
               </div>
            )}
         </div>
            
            <form className='spot-form-container' onSubmit={handleSubmit}>


               <ImageUploading
                  value={images}
                  onChange={(imageList) => setImages(imageList)}
                  maxNumber={5}
                  multiple
                  acceptType={['jpg', 'gif','png','peg']}
                  dataURLKey="data_url"
                  required
               >
               {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove }) => (
                  <div className='upload-container'>
                     <div className='image-upload-container' onClick={onImageUpload} >Click to Add Images</div>
                     {imageList.length >= 1 && (
                     <div className='upload-images'>
                        {imageList.map((image,index) => (
                           <div key={index} className='image-item'>
                              <img src={image["data_url"]} alt="" className='image-preview'/>
                              <div className='update-remove'> 
                                 {/* <div className='image-edit' onClick={() => onImageUpdate(index)}>
                                    Update
                                 </div> */}
                                 <div className='image-delete' onClick={() => {onImageRemove(index)
                                 imageRemove.push(image['id'])}}
                                 >
                                    Remove
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                     )}
                  </div>
               )}
               </ImageUploading>

               <div className='create-spot-form'>
                  <label className='create-spot-label'>Name</label>
                  <input className='create-spot-input'
                     type='text'
                     label='Name'
                     placeholder='Name'
                     name='name'
                     onChange={(e) =>setName(e.target.value)}
                     value={name}
                  />
               </div>
                  <div className='create-spot-form'>
                     <label className='create-spot-label'>Address</label>
                     <input className='create-spot-input'
                        label='Address'
                        placeholder='Address'
                        name='address'
                        onChange={(e) =>setAddress(e.target.value)}
                        value={address}
                     />
                  </div>
                  <div className='create-spot-city-state-country'>

                     <div className='create-spot-form-city'>
                        <label className='create-spot-label-location'>City</label>
                        <input className='create-spot-input-city'
                           label='City'
                           placeholder='City'
                           name='city'
                           onChange={(e) =>setCity(e.target.value)}
                           value={city}
                        />
                     </div>

                     <div className='create-spot-form-state'>
                        <label className='create-spot-label-location'>State</label>
                        <select className='create-spot-select-state'
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

                     <div className='create-spot-form-country'>
                        <label className='create-spot-label-location'>Country</label>
                        <select className='create-spot-select-country'
                           type="select"
                           onChange={(e) => setCountry(e.target.value)}
                        >
                           <option value="none" selected disabled hidden >Select a Country</option>
                           <option value="United States">Unites States</option>
                        </select>
                     </div>
                  </div>
                  <div className='create-spot-price-gues-bed-bath'>
                     <div className='create-spot-form-price'>
                        <label className='create-spot-label-room-info'>Price</label>
                        <input className='create-spot-room-info'
                           type='number'
                           label='Price'
                           placeholder='Price per night'
                           name='price'
                           onChange={(e) =>setPrice(e.target.value)}
                           onKeyDown={handleExpress}
                           value={price}
                           />
                     </div>
                     <div className='create-spot-form-guest'>
                        <label className='create-spot-label-room-info'>Guests</label>
                        <input className='create-spot-room-info'
                           type='number'
                           label='Guest'
                           placeholder='Guests'
                           name='guest'
                           onChange={(e) =>setGuest(e.target.value)}
                           onKeyDown={handleExpress}
                           value={guest}
                           />
                     </div>
                     <div className='create-spot-form-bed'>
                        <label className='create-spot-label-room-info'>Bedrooms</label>
                        <input className='create-spot-room-info'
                           type='number'
                           label='Bedroom'
                           placeholder='Bedrooms'
                           name='bedroom'
                           onChange={(e) =>setBedroom(e.target.value)}
                           onKeyDown={handleExpress}
                           value={bedroom}
                        />
                     </div>
                     <div className='create-spot-form-bath'>
                        <label className='create-spot-label-room-info'>Bath</label>
                        <input className='create-spot-room-info-bath'
                           type='number'
                           label='bathroom'
                           placeholder='Bathrooms'
                           name='bathroom'
                           onChange={(e) =>setBathroom(e.target.value)}
                           onKeyDown={handleExpress}
                           value={bathroom}
                           />
                     </div>
                  </div>
                  <div className='create-spot-form'>
                     <label className='create-spot-label'>Description</label>
                     <textarea className='create-spot-textarea'
                        name='description'
                        placeholder='Provide a Description'
                        onChange={(e) => setDescription(e.target.value)}
                        value = {description}
                     />
                  </div>

               <div className="spot-form-submit">
                  <button className="spot-form-button" type="submit">
                        Submit
                  </button >
               </div>
         </form>
      </div>
      )
   }


   export default EditSpot