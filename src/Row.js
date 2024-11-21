import React, { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/"
//HUV9ak9gnLOmzyxYnUd6tXuQ2l275L9WhOdSEYDe   17280

function Row({title,fetchUrl,isLargeRow}) {
    const [movies,setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState("");

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);
    // if we use [], than we are commading it to run once when the row loads, and never run it again.
    // whereas [movies] if we use it like this then it will run once, and run everytime movie is changes this is called dependencies.
    const opts = {
      height: "390",
      width: "100%",
      playerVars:{
        autoplay:1,
      },
    };

    const handleClick = (movie) =>{
      if(trailerUrl){
        setTrailerUrl('');
      }
      else{
        movieTrailer(movie?.name || "")
        .then((url) =>{
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        }).catch((error)=>console.log(error));
      }
    }

  return ( 
    <div className='row'>
        <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map(movie=>(
          <img
          key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path:movie.backdrop_path}`}
            alt={movie.name}/>
        ))}
      </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/> }
    </div>
  )
}

export default Row