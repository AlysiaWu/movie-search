import React, { useEffect, useState } from "react"
import MovieRows from "../components/MovieRows"
import { getPopularMovies, searchMovies, getMovieGenres } from "../api"
import './Home.css'

function HomePage() {
  let [moviesData, setMoviesData] = useState([])
  const [searchTerm, updateSearchTerm] = useState('')
  const [moviesResults, updateMovieResults] = useState([])
  const [genreFilters, updateGenreFilters] = useState("")
  const [allGenres, setAllGenres] = useState()
  const [initialized, setInitialized] = useState(false)

  const filterMovie = (genreId, data, allGenres) => {
    return data.filter(
      (movie) => movie.genre_ids.indexOf(Number(genreId)) > -1
    ).map(v => ({
        ...v,
        genres: v.genre_ids.map(
            id => allGenres.find(genre => id === genre.id).name
        ),
    }));
  };

  const getAllPopularMovies = async () => {
    const response = await getPopularMovies();
    setMoviesData(response.data.results);
    updateMovieResults(response.data.results);
  };

  const getAllMovieGenres = async () => {
    const response = await getMovieGenres();
    setAllGenres(response.data.genres);
  };

  const searchMoviesbyTerm = async (searchTerm, genreId) => {
    const res = await searchMovies(searchTerm);
    if (genreId && genreId !== 'Select a genre') {
        const filteredMovies = filterMovie(genreId, res.data.results, allGenres) 
        updateMovieResults(filteredMovies)
    } else {
        updateMovieResults(res.data.results )
    }
  };


  const handleSearch = searchTerm => {
    updateSearchTerm(searchTerm)
    searchMoviesbyTerm(searchTerm, genreFilters);
  };


  useEffect(() => {
    if (!initialized) {
      getAllMovieGenres();
      getAllPopularMovies();
      setInitialized(true);
    }
  }, [initialized]);

  // TODO: can be componentized later for reuse

  const Selections = () => {
    const handleGenreSelection = genreId => {
        updateGenreFilters(genreId);
        if (searchTerm) {
            searchMoviesbyTerm(searchTerm, genreId)
        } else {
        const filteredMovies = filterMovie(genreId, moviesData, allGenres)
        updateMovieResults(filteredMovies);
        }
    };

    return (
      <form>
        <label>
          <select
            style={{ height: "20px" }}
            value={genreFilters}
            onChange={(event) => handleGenreSelection(event.target.value)}
          >
            <option key="placeholder">Select a genre</option>
            {allGenres &&
              allGenres.map((genre, index) => (
                <option key={index} value={genre.id}>
                  {genre.name}
                </option>
              ))}
          </select>
        </label>
      </form>
    );
  };

  // TODO: can use styled components to bundle css in components
  return (
    <div className="page">
      <div className='search'>
        <form>
          <input
            style={{ height: "20px", width: "300px" }}
            value={searchTerm}
            onChange={(event) => handleSearch(event.target.value)}
          />
          <img
            style={{
              position: "relative",
              marginLeft: "-20px",
              height: "15px",
              display: "inline-block",
            }}
            src="https://img.icons8.com/android/24/000000/search.png"
          />
        </form>
        <Selections />
      </div>
      {moviesData && <MovieRows moviesResults={moviesResults} />}
    </div>
  );
}
export default HomePage;
