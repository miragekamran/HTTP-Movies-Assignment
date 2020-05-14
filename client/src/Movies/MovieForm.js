import React, { useState, useEffect } from 'react';
import axios from "axios";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const MovieForm = props => {
     const [movie, setMovie] = useState(initialMovie);

     useEffect (() => {
         const updateMovie = props.movies.find(movie => {
             return `${movie.id}`  === props.match.params.id;
         });

         console.log("Movie:", updateMovie);

         if(updateMovie) {
             setMovie(updateMovie);
         }
     }, [props.movies, props.match.params.id]);

     const handleSubmit = e => {
         e.preventDefault();
         axios
            .put(`http://localhost:5000/movies/${props.movie.id}`, movie)
            .then(res => {
                props.updateMovie(res.data);
                props.history.push(`/update-movie/${props.movie.id}`)
            })
            .catch(err => console.log("Error is: ", err))
     }

     return (
         <div>
             <h1>Update Movie</h1>
             <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='name'
                    placeholder='Movie Title'
                    value={props.movie.title}
                />
                <input
                    type='text'
                    name='name'
                    placeholder='Director Name'
                    value={props.movie.director}
                />
                <input
                    type='text'
                    name='name'
                    placeholder='Metascore'
                    value={props.movie.metascore}
                />
                <input
                    type='text'
                    name='name'
                    placeholder='Stars of the movie'
                    value={props.movie.stars}
                />
             </form>
             <button>Update and Add</button>
         </div>
     )

}

export default MovieForm;