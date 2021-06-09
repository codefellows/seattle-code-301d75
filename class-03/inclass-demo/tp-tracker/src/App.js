import React from 'react';
import AboutTheApp from './AboutTheApp.js';
import Button from 'react-bootstrap/Button';
import HouseholdItem from './HouseholdItem.js';
import hornedBeastData from './resources/data.json';
import './App.css';

class App extends React.Component {
  // My classes are generally organized as:
  // constructor first
  // (lifecycle methods)
  // then handlers/state updaters
  // render function last
  constructor(props) {
    super(props);

    // set up my state
    this.state = {
      funds: 100,
      shouldShowModal: false
    };
  }

  spendMoney = (cost) => {
    this.setState({
      funds: this.state.funds - cost
    });
  }

  showModal = () => {
    this.setState({
      shouldShowModal: true
    });
  }

  hideModal = () => {
    this.setState({
      shouldShowModal: false
    });
  }

  render() {
    console.log(hornedBeastData);
    let items = [
      {name: 'Toilet Paper', cost: 1}, 
      {name: 'Bell Peppers', cost: 0.75}, 
      {name: 'Paper Towels', cost: 2}];
    return (
      <>
      <AboutTheApp 
          shouldShowModal={this.state.shouldShowModal}
          hideModal={this.hideModal}
        />
        <h1>TP Tracker</h1>
        <h2>Current budget: ${this.state.funds}</h2>
        <Button onClick={this.showModal}>About the App</Button>
        
        {
          items.map(item => {
            return <HouseholdItem 
              name={item.name}
              cost={item.cost}
              // passing that function down as a callback, as a prop
              handleBuyItem={this.spendMoney}
            />
          })
        }
      </>
    )
  }
}

export default App;
