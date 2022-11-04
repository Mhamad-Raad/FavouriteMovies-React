import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
    setisLoading(true);
    try {
      const response = await fetch('https://swapi.dev/api/films/');

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });
      setMovies(transformedMovies);
      setisLoading(false);
    } catch (err) {
      setError(err.message);
      setisLoading(false);
    }
  };

  let content = <p>FETCH !!!!</p>;

  if (isLoading === true) {
    content = <p>Loading...</p>;
  }  if (movies.length > 0 ) {
    content = <MoviesList movies={movies} />;
  } if (movies.length === 0 && error !== null) {
    content = <p>No movies found, try to fetch</p>;
  } if (error) {
    content = <p>{error}</p>;
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} >Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
