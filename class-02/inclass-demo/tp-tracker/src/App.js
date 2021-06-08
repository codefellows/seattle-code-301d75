import React from 'react';
import HouseholdItem from './HouseholdItem.js';
import hornedBeastData from './resources/data.json';
import './App.css';

class App extends React.Component {
  render() {
    console.log(hornedBeastData);
    return (
      <>
        <h1>TP Tracker</h1>
        <HouseholdItem name="Toilet Paper" />
        <HouseholdItem name="Bell Peppers" />
        <HouseholdItem name="Paper Towels"/>
      </>
    )
  }
}

export default App;
