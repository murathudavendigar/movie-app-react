import { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, signInWithGoogle } from "../auth/firebase";
import NavbarComp from "../components/NavbarComp";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/AuthContext";

const Login = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  //! Context API  //////////////////

  const { userContext, setUserContext } = useContext(LoginContext);

  //! Context API ////////////////////

  //! SIGN GOOGLE ///////////////////
  const signGoogle = () => {
    signInWithGoogle();
    const nameGoogle = localStorage.getItem("name");
    setUserContext({ email: nameGoogle, password: "" });
    navigate(-1);
  };
  //! SIGN GOOGLE ////////////////////

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      setUserContext({ email: registerEmail, password: registerPassword });

      console.log(user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);

      setUserContext({ email: loginEmail, password: loginPassword });
      navigate(-1);
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = async () => {
    await signOut(auth);
    localStorage.clear();
  };

  return (
    <div>
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          placeholder="Password..."
          onChange={(e) => setRegisterPassword(e.target.value)}
        />

        <button onClick={register}> Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          placeholder="Password..."
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <button onClick={login}> Login</button>
      </div>
      <input type="text" />
      <div>
        <button onClick={signGoogle}>Sign In With Googe</button>
        <h1>{localStorage.getItem("name")}</h1>
        <h1>{localStorage.getItem("email")}</h1>
        <img src={localStorage.getItem("profilePic")} alt="" />
      </div>
      <h4> User Logged In: </h4>
      {user?.email}
      <button onClick={logout}> Sign Out </button>
    </div>
  );
};

export default Login;
