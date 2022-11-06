import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { LoginContext } from "../context/AuthContext";

const PrivateRouter = () => {
  const { userContext, setUserContext } = useContext(LoginContext);

  return (
    <div>
      {!userContext.email && !localStorage.getItem("name") ? (
        alert("Please Login")
      ) : (
        <Outlet />
      )}
    </div>
  );
};
export default PrivateRouter;
