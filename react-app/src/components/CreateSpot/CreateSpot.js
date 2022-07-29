import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { addSpot, uploadImage } from "../../store/spot"
import ImageUploading from 'react-images-uploading'
import { getSpot } from "../../store/spot"
import './CreateSpot.css'


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
   const [imageUrl, setImageUrl] =useState([])
   const [images, setImages] =useState([])
   const [imagePreview, setImagePreview] =useState(false)
   console.log(sessionUser, '1111')
   console.log(imageUrl)

//    const updateImage = async (e) => {

//    const file = e.target.files[0];
//    if (file) {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = function (e) {
//          setImagePreview(reader.result);
//       };
//       setImageUrl(file);
//     } else {
//       setImagePreview(false);
//     }
//   };


   const multiUpload = async (images, spotId) => {
      for (let i = 0; i< images.length; i++) {
         const file = images[i].file
         await dispatch(uploadImage(file, spotId))
      }
   }


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
      
      if (spot.id) {
         // const upload = await dispatch(uploadImage(imageUrl, spot.id))
         await multiUpload(images, spot.id)

      }
      if (spot.errors) {
         setErrors(spot.errors)
         return 
      } else {
         history.push(`/spots/${spot.id}`)
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
      <div className='create-spot-page-container'>
         <div className='create-spot-name-container'>
            <h1 className='create-spot-name'>Host a spot on LuxBnB</h1>
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
            {/* <div className="spot-form-image-container">
               <label>Image</label>
                  <input className='create-spot-input'
                  type="file"
                  name="image"
                  multiple={true}
                  accept=".jpg, .jpeg, .png"
                  // onChange={updateImage}
                  required
                  ></input>
            </div>
            {imagePreview && <img className='image-preview' src={imagePreview} />} */}

               <ImageUploading
                  value={images}
                  onChange={(imageList) => setImages(imageList)}
                  maxNumber={5}
                  multiple
                  acceptType={['jpg', 'gif','png','peg']}
                  dataURLKey="data_url"
               >
               {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove }) => (
                  <div className='upload-container'>
                     <div 
                        className='image-upload-container' onClick={onImageUpload}>Click to Add Images
                     </div>
                     {imageList.length >= 1 && (
                     <div className='upload-images'>
                        {imageList.map((image,index) => (
                           <div key={index} className='image-item'>
                              <img src={image["data_url"]} alt="" className='image-preview'/>

                              <div className='image-edit' onClick={() => onImageUpdate(index)}>
                                 Update
                              </div>
                              <div className='image-delete' onClick={() => onImageRemove(index)}>
                                 Remove
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
                  required
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
                     required
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
                        required
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
                  {/* <button type='button' onClick={addImage}>Add Image</button> */}
                  <button className="spot-form-button" type="submit">Add Spot</button >
               </div>
         </form>
      </div>
   )

}

export default CreateSpotForm 