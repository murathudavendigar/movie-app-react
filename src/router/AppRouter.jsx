import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComp from "../components/NavbarComp";
import AuthContext from "../context/AuthContext";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MovieDetail from "../pages/MovieDetail";
import Register from "../pages/Register";
import SimilarMovies from "../pages/SimilarMovies";
import PrivateRouter from "./PrivateRouter";
import Contact from "../pages/Contact";
import About from "../pages/About";

const AppRouter = () => {
  return (
    <AuthContext>
      <BrowserRouter>
        <NavbarComp />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/details/:id" element={<PrivateRouter />}>
            <Route path="" element={<MovieDetail />} />
          </Route>
          <Route path="/similar" element={<SimilarMovies />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthContext>
  );
};

export default AppRouter;
