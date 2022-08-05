const LOAD_BOOKINGS ='/bookings/LOAD_BOOKINGS'
const ADD_BOOKING ='/bookings/ADD_BOOKINGS'
const REMOVE_BOOKING ='/bookings/REMOVE_BOOKING'


const loadBookings = bookings => {
   {
      type: LOAD_BOOKINGS,
      bookings
   }
}

const loadBooking = booking => {
   {
      type: ADD_BOOKING,
      booking
   }
}

const removeBooking = booking => {
   {
      type: REMOVE_BOOKING,
      booking
   }
}

export const getUserBookings = (id) => async dispatch => {
   const res = await fetch(`/api/bookings/users/${id}`)
   if (res.ok) {
      const booking = await response.json()
      dispatch(loadBookings(booking))
   }
   return res
}


export const addBooking = (payload) => async dispatch => {
   const res = await fetch(`api/bookings/spot/${payload.spot_id}`, {
      method:'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
   })
   if (res.ok) {
      const booking = await res.json()
      dispatch(loadBooking(booking))
      return booking 
   } else if (res.status<500) {
      const data = await res.json()
      if (data) {
         return data
      }
   }
}

export const editBooking = (payload) => async dispatch => {
   const res = await fetch(`/api/booking/${payload.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
   })
   if (res.ok) {
      const booking = await res.json()
      dispatch(loadBooking(booking))
      return booking 
   } else if (res.status<500) {
      const data = await res.json()
      if (data) {
         return data
      }
   }
}

export const deleteBooking = (id) => async dispatch => {
   const res = await fetch(`/api/bookings/${id}`,{
      method: "DELETE"
   })
   if (res.ok) {
      const booking = await res.json()
      dispatch(removeBooking(booking))
      return booking 
   }
}

const bookingReduce = (state = {}, action) => {
   let newState;
   switch(action.type) {
      case LOAD_BOOKINGS: {
         newState={};
         action.bookings.forEach(booking =>newState[booking.id] = booking);
         return newState
      }
      case ADD_BOOKING: {
         newState= {}
      }
   }
}