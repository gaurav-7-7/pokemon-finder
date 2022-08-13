import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../App.css';

function PokemonItem({pokemon: name }){

  const [pokemonInfo, setPokemonInfo] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type1: "",
    type2: ""
  });

  axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
   .then((res) => {
      setPokemonInfo(
        {
          name: name,
          species: res.data.species.name,
          img: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          type1: res.data.types[0].type.name,
          type2: res.data.types[1]?.type.name
        }
      );
  });

  return (
    <div className="card text-center"> 
      <img src={pokemonInfo.img} alt='Pokemon'/>
      <span id="name" className='h-3'>{pokemonInfo.name}</span>
      <h5>Species: {pokemonInfo.species}</h5>
      <h5>HP: {pokemonInfo.hp}</h5>
      <h5>Attack: {pokemonInfo.attack}</h5>
      <h5>Defense: {pokemonInfo.defense}</h5>
      <h5>Type1: {pokemonInfo.type1}</h5>
      { pokemonInfo.type2?(<h5>Type2: {pokemonInfo.type2}</h5>) : (<h5>Type2: </h5>) }
    </div>
  );
};
PokemonItem.propTypes = {
  pokemon: PropTypes.object.isRequired
};
export default PokemonItem;