// deleted the imported logo.svg
import React from 'react';
// import our component from our file
import FunFact from './FunFact.js';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <>
        <h1>This is my app!</h1>
        <h2>What makes React cool?</h2>
        {/* use my component */}
        <FunFact title="components" potato="Components are helpful for reusing code." />
        <FunFact title="popular" potato="React is used by SO MANY companies." />
        <FunFact title="modular" potato="React makes it easier for LOTS of developers to work on a project together." />
      </>
    );
  }
}

export default App;
