import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import './Movie.css'

import {
    showMovieById,
    getImage,
    getSimilarMovie,
    getMovieCredits
 } from '../api'


// adult: false
// backdrop_path: "/5BwqwxMEjeFtdknRV792Svo0K1v.jpg"
// belongs_to_collection: null
// budget: 87500000
// genres: (2) [{…}, {…}]
// homepage: "https://www.foxmovies.com/movies/ad-astra"
// id: 419704
// imdb_id: "tt2935510"
// original_language: "en"
// original_title: "Ad Astra"
// overview: "The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown."
// popularity: 501.294
// poster_path: "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg"
// production_companies: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
// production_countries: (3) [{…}, {…}, {…}]
// release_date: "2019-09-17"
// revenue: 127175922
// runtime: 123
// spoken_languages: (2) [{…}, {…}]
// status: "Released"
// tagline: "The answers we seek are just outside our reach"
// title: "Ad Astra"
// video: false
// vote_average: 6
// vote_count: 3045


const Movie = () => {
    const [initialized, setInitialized] = useState(false)
    let [movie, setMovie] = useState()
    let [similarMovies, setSimilarMovies] = useState()
    let [movieCast, setMovieCast] = useState()

    let { id } = useParams();
    const getMovieById = async (id) => {
        const res = await showMovieById(id)
        setMovie(res.data)

    }

    const getSimilarMovies = async (id) => {
        const res = await getSimilarMovie(id)
        setSimilarMovies(res.data.results)
        console.log('--similar', res)

    }

    const getMovieCastCrews = async (id) => {
        const res = await getMovieCredits(id)
        setMovieCast(res.data.cast)
        console.log('creidtis', res)

    }

    useEffect(() => { 
        if(!initialized) {
            getMovieById(id)
            getSimilarMovies(id)
            getMovieCastCrews(id)
            console.log('--movie2', movie)
            setInitialized(true)
        }
        
    }, [])

    return (
        <div> 
            {
                movie && 
                <div className="one-movie movie-rows">
                    <div>
                        <h1>{movie.title}</h1>
                        <img src={getImage(movie.poster_path, 'poster')} />
                    </div>
                    <div className="movie-details">
                        <strong>Overview</strong> <p>{movie.overview}</p>
                        <p><strong>Vote Average:</strong> {movie.vote_average}</p>
                        <p><strong>Vote Counts:</strong> {movie.vote_count}</p>
                        <p><strong>Popularity:</strong> {movie.popularity}</p> 
                        <p><strong>Release Date:</strong> {movie.release_date}</p>

                    </div>
                </div>
            }


            <h3>Casts</h3>
 
            {movieCast && 
       
                    movieCast.map((c, index) => (
                        <div style={{
                            display: 'inline-block',
                            width: '30%',
                        }}>
                        <a key={index} href={`/person/${c.id}`}>
                            <img src={getImage(c.profile_path, 'profile')} />
                            
                            <p>{c.character} - {c.name}</p>
                        </a>



                        </div>
            
               
                
      
                  
    
                  
                ))
                
                }
       



            <h3>Similar Movies</h3>
            {similarMovies && similarMovies.map((m, index)=> 
                <div style={{
                    display: 'inline-block',
                    width: '25%',
                }}>
                    <a key={index} href={`/movie/${m.id}`}><img src={getImage(m.poster_path, 'profile')} /></a>
                    <p>{m.title}</p> 
                    </div>
                )}
       
   
        </div>
    )
    
}

export default Movie