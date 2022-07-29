const LOAD_SPOTS = '/spots/LOAD_SPOTS'
const ADD_SPOT = '/spots/ADD_SPOT'
// const ALL_SPOTS = 'spots/ALL_SPOTS'
const DELETE_SPOT ='spots/DELETE_SPOT'

const loadSpots = spots => {
   return { 
      type: LOAD_SPOTS,
      spots
   }}

const loadSpot = spot => {
   return {
      type: ADD_SPOT,
      spot
   }}

const deleteSpot = spot => {
   return {
      type: DELETE_SPOT,
      spot
   }}

export const getAllSpots = () => async dispatch => {
   const res = await fetch(`/api/spots/`)
   if (res.ok) {
      const spots = await res.json()
      dispatch(loadSpots(spots))
      return spots
   }
   return res
}

export const getSpot = (id) => async dispatch => {
   const res = await fetch(`/api/spots/${id}`)
   if (res.ok) {
      const spots = await res.json()
      dispatch(loadSpot(spots))
      return spots
   }
   return res
}

export const addSpot = (payload) => async dispatch => {
   const res = await fetch(`/api/spots/`, 
   {
      method:'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
   })
   if (res.ok) {
      const spot = await res.json()
      dispatch(loadSpot(spot))
      return spot
   } else if (res.status < 500) {
      const data = await res.json()
      if (data.errors) {
         return data
      }
   }
}

export const editSpot = (payload) => async dispatch => {
   const res = await fetch(`/api/spots/${payload.id}`, 
   {
      method:'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
   })
   if (res.ok) {
      const spot = await res.json()
      dispatch(loadSpot(spot))
      return spot
   } else if (res.status < 500) {
      const data = await res.json()
      if (data) {
         return data
      } 
   } 
}

export const removeSpot = (id) => async dispatch =>{
   const res = await fetch(`/api/spots/${id}`, 
   {
      method:'DELETE'
   })
   if (res.ok) {
      const spot = await res.json()
      dispatch(deleteSpot(spot))
      return spot 
   }
}
export const uploadImage = (image, spotId) => async dispatch => {

  const form = new FormData();
  form.append("image", image);

  const res = await fetch(`/api/spots/images/${spotId}`, {
    method: "POST",
    body: form,
  });

  if (res.ok) {
    const data = await res.json();
    return data
  } else {
    return {'errors': ["Filetype not supported"]};
  }
};

export const removeImage = (id) => async (dispatch) => {
  const res = await fetch(`/api/spots/images/${id}`, {
    method: "DELETE"
  })
  if (res.ok) {
    const data = await res.json();
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
}


const spotReducer = (state = {}, action) => {
   let newState;
   switch(action.type) {
      case LOAD_SPOTS: {
         newState= {...state}
         action.spots.forEach(spot => newState[spot.id] = spot);
         return newState
      }
      case ADD_SPOT: {
         newState = {...state}
         newState[action.spot.id] = action.spot
         return newState
      }
      case DELETE_SPOT: {
         newState = {...state}
         delete newState[action.spot.id]
         return newState
      }
      default:
         return state
   }
}
export default spotReducer