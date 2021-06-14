import React from 'react';
import Pokemon from './Pokemon.js';
import City from './City.js';

class App extends React.Component {

  render() {
    return (
      <>
        <City />
        <hr />
        <Pokemon />
      </>
    )
  }

}

export default App;
