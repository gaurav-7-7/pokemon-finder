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
  const [pageUrl, setPageUrl] = useState ("https://pokeapi.co/api/v2/pokemon/" );
  const homePage = 'https://pokemon-finder-bice.vercel.app/';
  const [searchName, setSearchName] = useState ([]);
  const [selectedPokemon, setSelectedPokemon] = useState(false);


  // pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pokemonsPerPage] = useState(10);
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [loading, setLoading] = useState(true);
  const [totalPokemons, setTotalPokemons] = useState();
  
  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(pageUrl, {
        cancelToken: new axios.CancelToken(c => (cancel = c))
      })
      .then(res => {
        setLoading(false);
        setTotalPokemons(res.data.count);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        setPokemons(res.data.results.map(p => p.name));
      });
    return () => cancel();
  }, [pageUrl]);

  // navigation
  function gotoNext() {
    setPageUrl(nextPage);
    if(pageNo !== nPages) {
      setPageNo(pageNo + 1);
    }
  }

  function gotoPrev() {
    setPageUrl(prevPage);
    if(pageNo !== 1) {
      setPageNo(pageNo - 1);
    }
  }

  function searchPokemon() {
    setSelectedPokemon(true);
  }

  if(loading) return <Spinner />;
  
  // getting current page pokemons
  const nPages =  Math.ceil(totalPokemons / pokemonsPerPage);
  const indexLast = currentPage * pokemonsPerPage;
  const indexFirst = indexLast - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexFirst, indexLast);

  return (
    <div className='app'>
      <div id="search" className='navbar'> 
        <h1><a href={homePage}>POKEMON FINDER</a></h1>
        <input type='text' onChange = {(e) => {
          setSelectedPokemon(false);
          setSearchName(e.target.value.toLowerCase())
          }}/>
        <button onClick={searchPokemon}>Search</button>
      </div>
      <div className='searchedpkmns'>
        {!selectedPokemon ? (
          <div className='paginatedpkmns'>
          <h3>Please select a Pokemon</h3>
          <Pokemons pokemons={currentPokemons}/>
          <Pagination
            id="pagination"
            pageNo={pageNo}
            nPages={nPages}
            gotoNext={nextPage ? gotoNext : null}
            gotoPrev={prevPage ? gotoPrev : null}
          />
          </div>
        ) : (<PokemonItem pokemon={searchName} />)} 
      </div>
    </div>
  )
}
export default App;
