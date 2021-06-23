import './App.css';
import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class App extends React.Component {
  
  async componentDidMount() {
    let res = await axios.post('http://localhost:3001/test');
    console.log(res.data);
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
            <Profile />
            </> : ''}
        </>
      )
    }
  }
}

export default withAuth0(App);
