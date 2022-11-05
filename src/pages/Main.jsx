import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Main.css";

const Main = () => {
  // console.log(process.env.REACT_APP_MOVIE_API_KEY);

  const [movieData, setMovieData] = useState([]);
  const [moviePic, setMoviePic] = useState("");

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! GET DATA
  const getData = async () => {
    const { data } = await axios(url);
    setMovieData(data.results);
  };

  console.log(movieData);
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! GET PIC

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center container">
      {movieData.map((movieItem, index) => {
        return (
          <div key={index} className="cardMovie">
            <div className="movieImage">
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
            <h2 className="text-center">{movieItem.original_title}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Main;
