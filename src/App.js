import React, {useState} from 'react';

import AddForm from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
    setisLoading(true);
    try {
      const response = await fetch('https://starwars-movies-react-default-rtdb.firebaseio.com/movies.json');

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
      setisLoading(false);
    } catch (err) {
      setError(err.message);
      setisLoading(false);
    }
  };

  const addMoviesHandler = async (movie) => {
    const response = await fetch('https://starwars-movies-react-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
  }

  let content = <p>FETCH !!!!</p>;

  if (isLoading === true) {
    content = <p>Loading...</p>;
  }  if (movies.length > 0 ) {
    content = <MoviesList movies={movies} />;
  } if (movies.length === 0 && error === null) {
    content = <p>No movies found, try to fetch</p>;
  } if (error) {
    content = <p>{error}</p>;
  }


  return (
    <React.Fragment>
      <section>
        <AddForm onAddMovie={ addMoviesHandler } />
      </section>
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
