import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginFormModal/LoginForm';
import SignUpForm from './components/auth/SignUpFormModal/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import { authenticate } from './store/session';
import SpotsPage from './components/Spots/SpotsPage';
import SpotDetails from './components/SpotDetails/SpotDetails';
import CreateSpotForm from './components/CreateSpot/CreateSpotForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
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
        <Route path='/' exact={true} >
          <SpotsPage/>
        </Route>
        <Route path='/spots/new' exact={true}>
          <CreateSpotForm />
        </Route>
        <Route path='/spots/:id' exact={true}>
          <SpotDetails />
        </Route>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
