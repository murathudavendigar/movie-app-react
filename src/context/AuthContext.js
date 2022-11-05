import { createContext, useState } from "react";

export const LoginContext = createContext();

const AuthContext = ({ children }) => {
  const [userContext, setUserContext] = useState({
    email: "",
    password: "",
  });

  const values = { userContext, setUserContext };

  return (
    <LoginContext.Provider value={values}>{children}</LoginContext.Provider>
  );
};

export default AuthContext;
