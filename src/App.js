import React, { useState, useEffect} from 'react';
import './App.css';
//import Navbar from './components/layout/Navbar';
import Pokemons from './components/pokemons/Pokemons';
import Pagination from './components/pokemons/Pagination';
import axios from 'axios';
import Spinner from './components/layout/Spinner';
import PokemonItem from './components/pokemons/PokemonItem';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pageUrl, setPageUrl] = useState ("https://pokeapi.co/api/v2/pokemon?limit=10" );
  const [searchName, setSearchName] = useState ([]);
  const [selectedPokemon, setSelectedPokemon] = useState(false);


  // pagination 
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(pageUrl, {
        cancelToken: new axios.CancelToken(c => (cancel = c))
      })
      .then(res => {
        setLoading(false);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        setPokemons(res.data.results.map(p => p.name));
      });
    return () => cancel();
  }, [pageUrl]);

  // navigation
  function gotoNext() {
    setPageUrl(nextPage);
  }

  function gotoPrev() {
    setPageUrl(prevPage);
  }

  function searchPokemon() {
    setSelectedPokemon(true);
  }

  if(loading) return <Spinner />;
    
  return (
    <div className='app'>
      <div className='navbar'> 
        <h1>POKEMON FINDER</h1>
        <input type='text' onChange = {(e) => {setSearchName(e.target.value)}}/>
        <button onClick={searchPokemon}>Search</button>
      </div>
      <div className='searchedpkmns'>
        {!selectedPokemon ? (<h3>Please select a pokemon</h3>) : (<PokemonItem pokemon={searchName} />)} 
      </div>
      <div className='paginatedpkmns'>
        <Pokemons pokemons={pokemons}/>
        <Pagination 
          gotoNext={nextPage ? gotoNext : null}
          gotoPrev={prevPage ? gotoPrev : null}
        />
      </div>
      
    </div>
  )
}
export default App;