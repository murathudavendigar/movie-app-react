import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useAuthContext } from "../context/AuthContext";
import { toastWarnNotify } from "../helpers/ToastNotify";
import "../styles/Main.css";

const Main = () => {
  // console.log(process.env.REACT_APP_MOVIE_API_KEY);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! HOOKS
  const [movieData, setMovieData] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CONTEXT API
  const { userContext } = useAuthContext();

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! URL and GLOBAL DATA
  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNumber}`;
  const urlNewMovie = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchMovie}`;

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! GET MOVIE DATA
  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios(url);
      setMovieData(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(movieData);

  const getNewMovie = async () => {
    const { data } = await axios(urlNewMovie);
    setMovieData(data.results);
  };
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! USE EFFECT
  useEffect(() => {
    getData();
  }, [pageNumber]);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! SEARCH CONTROL
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchMovie && userContext) {
      getNewMovie();
      setSearchMovie("");
    } else if (!userContext) {
      toastWarnNotify("please log in to see details");
    } else {
      toastWarnNotify("please enter a text");
    }
  };

  return (
    <>
      <form className="flex justify-center p-2 pt-5" onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md outline-none border p-1 m-2"
          placeholder="Search a movie..."
          onChange={(e) => setSearchMovie(e.target.value)}
          value={searchMovie}
        />
        <button className="text-white" type="submit">
          Search
        </button>
      </form>
      <div className="flex justify-center flex-wrap">
        {loading ? (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          movieData.map((movie) => <MovieCard key={movie.id} {...movie} />)
        )}
      </div>
      <div className="flex flex-row space-x-2 justify-center items-center gap-3 pt-5 pb-9">
        <button
          className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
          type="button"
          onClick={() => setPageNumber(pageNumber - 1)}>
          -
        </button>
        <p className="text-3xl">{pageNumber}</p>
        <button
          className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
          type="button"
          onClick={() => setPageNumber(pageNumber + 1)}>
          +
        </button>
      </div>
    </>
  );
};

export default Main;

<div class="flex space-x-2 justify-center">
  <div>
    <button
      type="button"
      class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
      -
    </button>
  </div>
</div>;
