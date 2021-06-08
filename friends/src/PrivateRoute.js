import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Friend from './Friend';


const initialValue = {
  name: "",
  age: 0,
  email: ""
};

const PrivateRoute = () => {

  const [ friends, setFriends ] = useState( [] );
  const [ friend, setFriend ] = useState( initialValue );

  let token = localStorage.getItem( "token" );

  useEffect( () => {
    axios.get( 'http://localhost:5000/api/friends', {
      headers: {
        authorization: token
      }
    } )
      .then( res => {
        console.log( res );
        setFriends( res.data );
      } )
      .catch( err => {
        console.error( err );
      } );
  }, [] );

  const changeHandler = e => {
    e.persist();
    
    if ( [ e.target.name ] == "age" ) {
      setFriend( {
        ...friend,
        [ e.target.name ]: Number( e.target.value )
      } );
    } else {
      setFriend( {
        ...friend,
        [ e.target.name ]: e.target.value
      } );
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Update the friends', friend);
    axios.post( `http://localhost:5000/api/friends`, friend, {
      headers: {
        authorization: token
      }
    })
      .then(res => {
        setFriends( res.data );
        setFriend( initialValue );
      })
      .catch(err => console.log(err))
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
       <input
          type="string"
          name="name"
          onChange={changeHandler}
          placeholder="John Smith"
          value={friend.name}
        />
        <input
          type="number"
          name="age"
          onChange={changeHandler}
          placeholder={15}
          value={friend.age}
        />
        <input
          type="string"
          name="email"
          onChange={changeHandler}
          placeholder="email@domain.com"
          value={friend.email}
        />
        <button >Add New Friend</button>
      </form>
      {
        friends ?
          friends.map( friend => {
            return (
              <Friend friendData={friend} />
            )
          })
          :
          <div>
            No Friends in Database
          </div>
      }
    </div>
  )

};

export default PrivateRoute;