import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Movie.css";

import {
  showMovieById,
  getImage,
  getSimilarMovie,
  getMovieCredits,
} from "../api";


const Movie = () => {
  const [initialized, setInitialized] = useState(false);
  let [movie, setMovie] = useState();
  let [similarMovies, setSimilarMovies] = useState();
  let [movieCast, setMovieCast] = useState();
  let { id } = useParams();

  const getMovieById = async (id) => {
    const res = await showMovieById(id);
    setMovie(res.data);
  };

  const getSimilarMovies = async (id) => {
    const res = await getSimilarMovie(id);
    setSimilarMovies(res.data.results);
  };

  const getMovieCastCrews = async (id) => {
    const res = await getMovieCredits(id);
    setMovieCast(res.data.cast);
  };

  useEffect(() => {
    if (!initialized) {
      getMovieById(id);
      getSimilarMovies(id);
      getMovieCastCrews(id);
      setInitialized(true);
    }
  }, [initialized]);

  return (
    <div>
      {movie && (
        <div className="one-movie">
          <div>
            <h1>{movie.title}</h1>
            <img src={getImage(movie.poster_path, "poster")} />
          </div>
          <div className="movie-details">
            <strong>Overview</strong> <p>{movie.overview}</p>
            <p>
              <strong>Vote Average:</strong> {movie.vote_average}
            </p>
            <p>
              <strong>Vote Counts:</strong> {movie.vote_count}
            </p>
            <p>
              <strong>Popularity:</strong> {movie.popularity}
            </p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
          </div>
        </div>
      )}

      <h3>Casts</h3>

      {movieCast &&
        movieCast.map((c, index) => (
          <div
            style={{
              display: "inline-block",
              width: "30%",
            }}
          >
            <a key={index} href={`/person/${c.id}`}>
              <img src={getImage(c.profile_path, "profile")} />

              <p>
                {c.character} - {c.name}
              </p>
            </a>
          </div>
        ))}

      <h3>Similar Movies</h3>
      {similarMovies &&
        similarMovies.map((m, index) => (
          <div
            style={{
              display: "inline-block",
              width: "25%",
            }}
          >
            <a key={index} href={`/movie/${m.id}`}>
              <img src={getImage(m.poster_path, "profile")} />
            </a>
            <p>{m.title}</p>
          </div>
        ))}
    </div>
  );
};

export default Movie;
