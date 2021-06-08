import React, { useState, useEffect } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import Login from './Login';
import PrivateRoute from './PrivateRoute';

import axios from 'axios';

function App () {
  
  const [ token, setToken ] = useState( "" );

  useEffect( () => {
    let jwtToken = localStorage.getItem( "token" );
    if ( jwtToken ) {
      setToken( jwtToken );
    }
    return;
  }, [] );

  const logout = () => {
    axios.post( 'http://localhost:5000/api/logout', {
      header: {
        authorization: localStorage.getItem( "token" )
      }
    } )
      .then( res => {
        console.log( res );
        localStorage.removeItem( "token" );
        window.location.replace('/')
      } )
      .catch( err => {
        console.error( err );
      } );
  };


  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link onClick={logout}>Logout</Link>
        </li>
        <li>
          <Link to="/friends">Friends</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/friends" render={props => 
          {return token ?
          <PrivateRoute {...props} /> : <Redirect to="/login" />
          }
        } />
        <Route path="/login" render={props =>
          <Login setToken={setToken} {...props} />
        } />
        <Route component={Login} />
      </Switch>
    </div>
  );
}

export default App;
