import React, { useState, useEffect } from "react";
import AddMovie from "./components/Movies/AddMovie";
import MovieList from "./components/Movies/MovieList";
import Button from "./components/UI/Button";
import Card from "./components/UI/Card";

import "./App.css";
import { useCallback } from "react";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-simple-project3-bb72f-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) throw new Error("Something went wrong 😢");

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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMoviesHandler = async (movie) => {
    const response = await fetch(
      "https://react-simple-project3-bb72f-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
  };

  let content = <h4>Found no movies</h4>;

  if (movies.length > 0) {
    content = <MovieList movies={movies} />;
  }

  if (isLoading) {
    content = <div className="loader">Loading...</div>;
  }

  if (error) {
    content = <h4>{error}</h4>;
  }

  return (
    <div className="app">
      <Card>
        <AddMovie onAddMovie={addMoviesHandler} />
      </Card>
      <Card>
        <Button onClick={fetchMoviesHandler}>Fetch Movies</Button>
      </Card>
      <Card>{content}</Card>
    </div>
  );
};

export default App;
