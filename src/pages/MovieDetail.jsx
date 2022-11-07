import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/MovieDetail.css";

const MovieDetail = () => {
  const { state: movieItem } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex justify-content-evenly m-3 detail-movie">
        <div className="imageDetails">
          <img
            src={`https://image.tmdb.org/t/p/w1280${movieItem.poster_path}`}
            alt=""
            width="300px"
          />
        </div>
        <div className="textDetails m-3">
          <h1>{movieItem?.original_title}</h1>
          <hr />
          <p>{movieItem?.overview}</p>
          <hr />
        </div>
      </div>
      <div className=" text-center mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate(-1)}>
          Go Back
        </button>
        <button
          className="btn btn-outline-warning"
          onClick={() => navigate("/similar", { state: movieItem })}>
          Get Similar Movie
        </button>
      </div>
    </>
  );
};

export default MovieDetail;
