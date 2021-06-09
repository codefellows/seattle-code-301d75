import React from 'react';
import Button from 'react-bootstrap/Button';

// State helps us with keeping track of data that might change based on an event.

// Event handlers need to know 3 things:
// 1. Where they're listening (which element)
// 2. What they're listening for (which event)
// 3. What to do when the thing happens
class HouseholdItem extends React.Component {

  // the first 2 lines here are ALWAYS the same in every React component constructor
  // call the React.Component constructor using super
  constructor(props) {
    super(props);

    // initialize our state
    this.state = {
      numberRemaining: 0
    };
  }

  increaseNumberRemaining = () => {
    // increase the number remaining in the state by 1
    // We CANNOT set state manually except in the constructor
    // We should use this.setState to update state outside of the constructor
    this.setState({
      numberRemaining: this.state.numberRemaining + 1,
      hasBought: true
    });
  }

  decreaseNumberRemaining = () => {
    this.setState({
      numberRemaining: this.state.numberRemaining - 1
    });
  }
  render() {
    console.log(this.state.hasBought);
    return (
      <>
        <h2>{this.props.name}</h2>
        <h3>{this.state.numberRemaining}</h3>
        <Button variant="success" onClick={this.increaseNumberRemaining}>I bought one!</Button>
        <Button variant="outline-danger" onClick={this.decreaseNumberRemaining}>I used one!</Button>
      </>
    )
  }
}

export default HouseholdItem;
