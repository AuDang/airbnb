// import React, { useEffect, useState } from "react";
// import {useSelector, useDispatch} from 'react-redux'
// import { addDays } from "date-fns";
// import { DateRangePicker } from "react-date-range";
// import { dateArrayCreator } from "../../utils/dateArray";

// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file

// const Calendar = ({stateVars}) => {
//    const today = new Date()

//   	// let {
// 	// 	checkin,
// 	// 	setCheckin,
// 	// 	checkout,
// 	// 	setCheckout,
// 	// 	nights,
// 	// 	setNights,
// 	// } = stateVars; 

//    const [state, setState] =useState([
//       {
//          startDate: today,
//          endDate: addDays(today, 2)
//       }
//    ])

//    const spot = useSelector((state) => state.bookingReducer)
//    console.log('spotttt',spot )
//    const user = useSelector((state) => state.session.user)
//    console.log('user', user)

//    // const spotBooking = spot.



//    return (
//       <>
//       HELLO
//       </>
//    )
// }

// export default Calendar 