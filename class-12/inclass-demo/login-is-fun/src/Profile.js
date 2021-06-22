import React from 'react';

import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
class Profile extends React.Component {
  // code that should run ONCE, when the component appears on the page, goes in ComponentDidMount
  async componentDidMount() {
    // this is going to be the same, always, for making requests to the server including the token
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    const config = {
      headers: {"Authorization" : `Bearer ${jwt}`}
    };
    let catData = await axios.get(`http://localhost:3001/cats`, config);
    console.log(catData);
    this.setState({catData: catData.data})
  }
  render() {
    const {user} = this.props.auth0;
    return (
      <>
        <h3>{user.name}</h3>
        {this.state? this.state.catData.map(cat => <h4 key={cat._id}>{cat.name}, a {cat.color} cat</h4>) : ''}
      </>
    )
  }
}

export default withAuth0(Profile);
