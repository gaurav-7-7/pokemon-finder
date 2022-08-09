import React from 'react';
import PropTypes from 'prop-types';

const PokemonItem = ({pokemon: name }) => {
    return (
      <div className="card text-center"> 
        <h3>{name}</h3>
      </div>
    );
};
PokemonItem.propTypes = {
  pokemon: PropTypes.object.isRequired
};
export default PokemonItem;