import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      credentials: {
        username: '',
        password: ''
      }
    };
  }

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    axios.post( 'http://localhost:5000/api/login', this.state.credentials)
      .then( res => {
        console.log("login: ", res.data.payload)
        localStorage.setItem( "token", `${res.data.payload}` );
        let token = res.data.payload;
        this.props.setToken(token);
        this.props.history.push( '/friends' );
      } )
      .catch( err => {
        console.error( err.message );
      } );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;