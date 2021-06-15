import axios from 'axios';
import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      restaurantInfo: []
    };
  }
  onButtonClick = async (e) => {
    e.preventDefault();
    // make a request to our server
    let restaurantInfo = await axios.get(`http://localhost:3001/restaurants?location=${e.target.location.value}`)
    console.log(restaurantInfo);
    // save that info into the state
    this.setState({
      restaurantInfo: restaurantInfo.data
    })
  }
  render() {
    return (
      <>
        <h1>Hello!</h1>
        <form onSubmit={this.onButtonClick}>
          <input id="location" />
          <button>Get the data</button>
        </form>
        {this.state.restaurantInfo.map( (rest, i) => <h3 key={i}>{rest.restaurant}</h3>)}
      </>
    )
  }
}

export default App;
