import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Main.css";

const SimilarMovies = () => {
  const { state: movieItem } = useLocation();
  const navigate = useNavigate();

  const [similarMovie, setSimilarMovie] = useState([]);

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${movieItem?.id}/similar?api_key=${apiKey}&language=en-US&page=1`;

  const getSimilarMovie = async () => {
    const { data } = await axios(url);
    setSimilarMovie(data.results);
  };
  useEffect(() => {
    getSimilarMovie();
  }, []);

  console.log(similarMovie);
  return (
    <div className="d-flex flex-wrap justify-content-center container">
      {similarMovie.map((movieItem, index) => {
        return (
          <div key={index} className="cardMovie">
            <div
              className="movieImage"
              onClick={() => navigate("/details", { state: movieItem })}>
              <img
                src={`https://image.tmdb.org/t/p/w1280${movieItem.poster_path}`}
                alt=""
                width="300px"
              />
              <div className="overview">
                <h2>Overview</h2>
                <p>{movieItem.overview}</p>
              </div>
            </div>
            <div className="infoMovie d-flex justify-content-between align-items-center ">
              <h3 className="d-flex ">{movieItem.original_title}</h3>
              {movieItem.vote_average > 8.0 ? (
                <h2 className="btn btn-success">
                  {movieItem.vote_average.toFixed(1)}
                </h2>
              ) : (
                <h2 className="btn btn-warning">
                  {movieItem.vote_average.toFixed(1)}
                </h2>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SimilarMovies;
