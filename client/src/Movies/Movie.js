import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const handleDelete = e => {
    axios
      .delete()
      .then(res => {
        history.push("/");
        console.log(res)
      })
      .catch(err => console.log(err));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} fetchMovie={fetchMovie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div className='edit-button' onClick={() => history.push(`/update-movie/:id`)}>
        Edit
      </div>
      <div className='delete-button' onClick={handleDelete} >
        Delete
      </div>
    </div>
  );
}

export default Movie;
