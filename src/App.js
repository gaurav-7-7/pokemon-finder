import React, { useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Pokemons from './components/pokemons/Pokemons';
import axios from 'axios';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pageUrl, setPageUrl] = useState ("https://pokeapi.co/api/v2/pokemon?limit=10" );

  useEffect(() => {
    axios
      .get(pageUrl)
      .then(res => {
        setPokemons(res.data.results.map(p => p.name));
      });
  });
  return (
    <div className='app'>
      <Navbar />
      <Pokemons pokemons={pokemons}/>
    </div>
  )
}
export default App;