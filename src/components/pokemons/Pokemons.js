import React from 'react';
import PokemonItem from './PokemonItem';
import PropTypes from 'prop-types';

function Pokemons({pokemons}) {
  return (
    <div style={userStyle}>
      {pokemons.map((p,index) => (
        <PokemonItem key={index} pokemon={p}/>
      ))}
    </div>
  );
}

Pokemons.propTypes = {
  pokemon: PropTypes.array.isRequired,
}

const userStyle = {
  display : 'grid',
  gridTemplateColumns : 'repeat(3, 1fr)',
  gridGap : '1rem',
  padding: '0.5rem',
}
export default Pokemons;