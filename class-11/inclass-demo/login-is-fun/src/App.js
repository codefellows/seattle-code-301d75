import './App.css';
import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class App extends React.Component {
  makeRequest = async () => {
    // this is going to be the same, always, for making requests to the server including the token
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    const config = {
      headers: {"Authorization" : `Bearer ${jwt}`}
    };

    const serverResponse = await axios.get('http://localhost:3001/test-login', config);

    console.log(serverResponse);
  }
  render() {
    console.log(this.props.auth0);
    const { user, isAuthenticated, isLoading } = this.props.auth0;
    // const user = this.props.auth0.user;

    if (isLoading) {
      return <h2>Loading...</h2>
    } else {
      return (
        <>
          <h1>Login is fun</h1>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          {user ? <>
            <h3>{user.name}</h3>
            <button onClick={this.makeRequest}>Make request to server</button>
            </> : ''}
        </>
      )
    }
  }
}

export default withAuth0(App);
