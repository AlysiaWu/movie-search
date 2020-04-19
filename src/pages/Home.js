import React, { useEffect, useState } from 'react'

import MovieRows from '../components/MovieRows'

import { getPopularMovies, searchMovies, getMovieGenres } from '../api'

function HomePage() {
    let [moviesData, setMoviesData] = useState([])
    const [moviesResults, updateMovieResults] = useState([])
    const [genreFilters, updateGenreFilters] = useState('')
    const [allGenres, setAllGenres] = useState()
    const [initialized, setInitialized] = useState(false)

    const getAllPopularMovies = async () => {
        const response = await getPopularMovies()
        setMoviesData(response.data.results)
        updateMovieResults(response.data.results)
    
    }

    const getAllMovieGenres = async () => {
        const response = await getMovieGenres()
        setAllGenres(response.data.genres)
    }

    const searchMoviesbyTerm = async (searchTerm) => {
        const res = await searchMovies(searchTerm)
        updateMovieResults(res.data.results)
    }

    const handleSearch = (searchTerm) => {
        searchMoviesbyTerm(searchTerm)
    }

    useEffect(() => { 
        if(!initialized) {
            getAllMovieGenres()
            getAllPopularMovies()
            
            setInitialized(true)
        }
    }, [])


    const Selections = () => {
        const handleGenreSelection = (value) => {
            updateGenreFilters(value)
            const genreId = value
            const filterMovie = genreId => {
                return moviesData.filter(movie => movie.genre_ids.indexOf(Number(genreId)) > -1)
            }
            const filteredMovies = filterMovie(genreId).map(v => ({ ...v, genres: v.genre_ids.map(id => allGenres.find(genre => id == genre.id).name )}))
            updateMovieResults(filteredMovies)
        }

        
        return (
            <form >
            <label>
                <select style={{height: '20px'}}
                    value={genreFilters} onChange={(event) => handleGenreSelection(event.target.value)}>
                    <option key='placeholder' >Select a genre</option>
                    {allGenres && allGenres.map((genre, index) => (
                    <option key={index} value={genre.id}>{genre.name}</option>
                  ))}
              </select>
            </label>
          </form>
        )
 

    }



     


    return (
        <div className='page'>
                
                <div>
                <Selections />
                <form>

                <input
                     style={{height: '20px', width: '300px'}}
                     onChange={(event) => handleSearch(event.target.value)}
                   />          
                   <img style={{
                        position: 'relative',
                        marginLeft: '-20px',
                        height: '15px',
                        display: 'inline-block'

                    }}
                    src="https://img.icons8.com/android/24/000000/search.png"/>
                </form>

                  </div>
                { moviesData && <MovieRows moviesResults={moviesResults} />}
    

        </div>
    )

}
export default HomePage