import React from 'react';

import axios from 'axios';

class Pokemon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemon: []
    };
  }

  getPokemon = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    let pokemon = response.data.results;

    // Shows how you can fetch a 2nd thing in the same async call ...
    const response2 = await axios.get('https://pokeapi.co/api/v2/ability/65')
    console.log(response2.data);

    // Only using the initial call
    this.setState({pokemon});
  }

  render() {
    return (
      <>
        <h1>Pokemon Go Here</h1>
        <button onClick={this.getPokemon}>Get The Pokemon</button>
        <ul>
          {
            this.state.pokemon.map( (pokemon, idx) =>
              <li key={pokemon.name}>{pokemon.name}</li>
            )
          }
        </ul>
      </>
    )
  }

}

export default Pokemon;
