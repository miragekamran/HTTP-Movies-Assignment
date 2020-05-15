import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: [],
}

export default function UpdateMovie(props) {
  const [mov, setMov] = useState({ initialMovie });
  const history = useHistory();

  const changeHandler = e => {
    setMov({
      ...mov,
      [e.target.name]: e.target.value,
    });
  };
  
  useEffect(() => {
    const movToUpdate = props.movies.find(movie => {
      return `${movie.id}` === props.match.params.id;
    });

    // console.log("movToUpdate", movToUpdate);

    if (movToUpdate) {
      setMov(movToUpdate);
    }
  }, [props.movies, props.match.params.id]);

  const updatingMovie = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5001/api/movies/${mov.id}`, mov)
      .then(res => {
        console.log("Update Move: ", res)
        history.push(`/`)
      })
      .finally(() => window.location.reload())
      .catch(err => console.log("Error Updating Move: ", err));
  };


  return (
    <section className="update-form">
      <h2>Update Movie</h2>
      <form onSubmit={updatingMovie}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="string"
          value={mov.title}
          onChange={changeHandler}
        />
        <label htmlFor="director">Director</label>
        <input
          name="director"
          type="string"
          value={mov.director}
          onChange={changeHandler}
        />
        <label htmlFor="metascore">Metascore</label>
        <input
          name="metascore"
          type="number"
          value={mov.metascore}
          onChange={changeHandler}
        />
        <label htmlFor="stars">Stars</label>
        <input
          name="stars"
          type="string"
          value={mov.stars}
          onChange={changeHandler}
        />
        <button type='submit'>Update</button>
      </form>
    </section>
  );
}


