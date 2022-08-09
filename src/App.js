import React, { useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Pokemons from './components/pokemons/Pokemons';
import Pagination from './components/pokemons/Pagination';
import axios from 'axios';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pageUrl, setPageUrl] = useState ("https://pokeapi.co/api/v2/pokemon?limit=10" );

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

  if(loading) return "Loading...";

  return (
    <div className='app'>
      <Navbar />
      <Pokemons pokemons={pokemons}/>
      <Pagination 
        gotoNext={nextPage ? gotoNext : null}
        gotoPrev={prevPage ? gotoPrev : null}
      />
    </div>
  )
}
export default App;