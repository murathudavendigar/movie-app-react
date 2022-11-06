import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/AuthContext";
import "../styles/Main.css";

const Main = () => {
  // console.log(process.env.REACT_APP_MOVIE_API_KEY);

  const [movieData, setMovieData] = useState([]);
  const navigate = useNavigate();
  const { userContext, setUserContext } = useContext(LoginContext);
  const [searchMovie, setSearchMovie] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNumber}`;

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! GET DATA
  const getData = async () => {
    const { data } = await axios(url);
    setMovieData(data.results);
  };

  console.log(movieData);

  const getNewMovie = async () => {
    const urlNewMovie = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchMovie}`;
    const { data } = await axios(urlNewMovie);
    setMovieData(data.results);
  };

  useEffect(() => {
    getData();
  }, [pageNumber]);

  return (
    <>
      <div className="text-center">
        <input
          type="text"
          className="text-center"
          onChange={(e) => setSearchMovie(e.target.value)}
        />
        <button
          onClick={
            !userContext.email && !localStorage.getItem("name")
              ? alert("Please Login")
              : getNewMovie
          }>
          Search
        </button>
      </div>
      <div className="d-flex flex-wrap justify-content-center container">
        {movieData.map((movieItem, index) => {
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
                {(!userContext.email && !localStorage.getItem("name")) ||
                  (movieItem.vote_average > 8.0 ? (
                    <h2 className="btn btn-success">
                      {movieItem.vote_average.toFixed(1)}
                    </h2>
                  ) : (
                    <h2 className="btn btn-warning">
                      {movieItem.vote_average.toFixed(1)}
                    </h2>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className=" d-flex justify-content-center p-4">
        <button
          className="btn btn-danger"
          onClick={() => setPageNumber(pageNumber - 1)}>
          -
        </button>
        <h3>{pageNumber}</h3>
        <button
          className="btn btn-success"
          onClick={() => setPageNumber(pageNumber + 1)}>
          +
        </button>
      </div>
    </>
  );
};

export default Main;
