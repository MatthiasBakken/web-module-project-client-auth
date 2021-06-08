import React from 'react';


const Friend = ( props ) => {
  const { id, name, age, email } = props.friendData;

  console.log(props.friendData)

  return (
    <div key={id}>
      <h1>{`Name: ${name}`}</h1>
      <p>{`Age: ${age}`}</p>
      <p>{`Email: ${email}`}</p>
    </div>
  )
}

export default Friend;