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

  getConfig = async() => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    const config = {
      headers: {"Authorization" : `Bearer ${jwt}`}
    };
    return config;
  }

   onSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name: e.target.name.value,
      color: e.target.color.value
    }
    console.log(data);

    let config = await this.getConfig();
    // send data to backend
    // the second argument to .post is the data that will be the request body
    // the third argument is config, including the header
    const responseData = await axios.post('http://localhost:3001/cats', data, config);
    console.log(responseData);
    let updatedArray = this.state.catData;
    // add the new cat we created into the array
    updatedArray.push(responseData.data);
    this.setState({catData: updatedArray});
  }

  deleteCat = async (id) => {
    let config = await this.getConfig();
    let response = await axios.delete(`http://localhost:3001/cats/${id}`, config);
    console.log(response);
    let updatedArray = this.state.catData.filter(cat => cat._id !== id);
    this.setState({catData: updatedArray});
  }
  render() {
    const {user} = this.props.auth0;
    return (
      <>
        <h3>{user.name}</h3>
        {this.state? this.state.catData.map(cat => 
        <h4 key={cat._id}>
          {cat.name}, a {cat.color} cat
          <button onClick={() => this.deleteCat(cat._id)}>Delete</button>
        </h4>) : ''}
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name">Cat name</label>
          <input id="name" />
          <label htmlFor="color">Cat color</label>
          <input id="color" />
          <input type="submit" />
        </form>
      </>
    )
  }
}

export default withAuth0(Profile);
