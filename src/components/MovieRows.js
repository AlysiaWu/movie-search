import React from "react";
import { Link } from "react-router-dom";
import { getImage } from "../api";

import "./MovieRows.css";

export const OneMovie = ({ movie, idx }) => (
  <div key={idx} className="movie-row">
    <div>
      <h1>{movie.title}</h1>
      <img src={getImage(movie.poster_path, "poster")} />
    </div>
    <div className="movie-details">
      <strong>Overview</strong> <p>{movie.overview}</p>
      {movie.genres && (
        <p>
          <strong>Genres:</strong> {movie.genres}
        </p>
      )}
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
);

const MovieRows = ({ moviesResults }) =>
  moviesResults.map((movie, idx) => (
    <Link
      key={idx}
      to={{
        pathname: `/movie/${movie.id}`,
      }}
    >
      <OneMovie movie={movie} idx={idx} />
    </Link>
  ));

export default MovieRows;
