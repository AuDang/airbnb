import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/Navigation/NavBar';
import { authenticate } from './store/session';
import SpotsPage from './components/Spots/SpotsPage';
import SpotDetails from './components/SpotDetails/SpotDetails';
import CreateSpotForm from './components/CreateSpot/CreateSpot';
import Footer from './components/Footer/Footer'
import ErrorPage from './components/404/404';
import { getAllSpots} from './store/spot';
import {getBookings} from './store/booking'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList'
import UserBookings from './components/Bookings/UserBookings/UserBookings';
import BookingConfirmation from './components/Bookings/BookingConfirmation/BookingConfirmation';
// 


function App() {
  const [loaded, setLoaded] = useState(false);
  // const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

//   useEffect(() => {
//   (async () => {
//     if (user) {
//       await dispatch(getUserBookings(user?.id))
//     }
//   })();
// }, [dispatch, user])

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getAllSpots());
      await dispatch(getBookings());
      // await dispatch(getUsers())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/' >
          <SpotsPage/>
        </Route>
        <ProtectedRoute exact path='/users'>
          <UsersList />
        </ProtectedRoute>
        {/* <ProtectedRoute exact path='/users/:userId'>
          <User/>
        </ProtectedRoute> */}
        <Route exact path='/spots/new'>
          <CreateSpotForm />
        </Route>
        <Route exact path='/spots/:id'>
          <SpotDetails />
        </Route>
        <Route exact path='/users/:id/bookings'>
          <UserBookings />
        </Route>
        <Route path='/bookings'>
          <BookingConfirmation />
        </Route>
        <Route path='/404-Page-Not-Found'>
          <ErrorPage />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
