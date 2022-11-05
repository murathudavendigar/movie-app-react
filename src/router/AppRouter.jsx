import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComp from "../components/NavbarComp";
import AuthContext from "../context/AuthContext";
import Login from "../pages/Login";
import Main from "../pages/Main";

const AppRouter = () => {
  return (
    <AuthContext>
      <BrowserRouter>
        <NavbarComp />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
};

export default AppRouter;
