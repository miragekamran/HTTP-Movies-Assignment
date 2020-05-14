import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: [],
}

export default function UpdateMovie(props) {
  const [mov, setMov] = useState({ initialMovie });

  const changeHandler = e => {
    setMov({
      ...mov,
      [e.target.name]: e.target.value,
    });
  };
  const updatingMovie = () => {
    axios
      .put(`http://localhost:5001/api/movies/${props.history.id}`, mov)
      .then(res => console.log("Update Move: ", res))
      .catch(err => console.log("Error Updating Move: ", err));
  };
  useEffect(() => {
    const movToUpdate = props.movies.find(item => {
      return `${item.id}` === props.match.params.id;
    });

    console.log("movToUpdate", movToUpdate);

    if (movToUpdate) {
      setMov(movToUpdate);
    }
  }, [props.movies, props.match.params.id]);

  return (
    <section className="update-form">
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
        <button>Update</button>
      </form>
    </section>
  );
}


