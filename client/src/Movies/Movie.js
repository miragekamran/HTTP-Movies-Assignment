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

  const handleEdit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, movie)
      .then((res) => {
        console.log(res);
        history.push(`/update-movie/${params.id}`);
      })
      .finally(() => window.location.reload())
      .catch((err) => console.log("edit error", err));
  };

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        history.push(`/`);
        console.log(res);
      })
      .finally(() => window.location.reload())
      .catch((err) => console.log(err));
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

      <div className="edit-button" onClick={() => history.push(`/update-movie/${movie.id}`)}>
        Edit
      </div>
      <div className="delete-button" onClick={handleDelete}>
        Delete
      </div>
    </div>
  );
}

export default Movie;

// onClick={() => history.push(`/update-movie/${movie.id}`)}
