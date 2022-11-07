import { useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, signInWithGoogle } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/AuthContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import "../styles/Login.css";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginControl, setLoginControl] = useState(true);
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

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);

      setUserContext({ email: loginEmail, password: loginPassword });
      setLoginControl(true);
      navigate(-1);
    } catch (error) {
      setLoginControl(false);
    }
  };

  return (
    <div className="container">
      <div className="d-flex row justify-content-center g-3 bg-primary col-12">
        <h3 className="text-center mb-4"> Login </h3>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password..."
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
        </FloatingLabel>
        {loginControl ? (
          <Button className="buttoN" onClick={login}>
            Login
          </Button>
        ) : (
          <>
            <h1 className="text-center display-6 text-light mb-0">
              Wrong Input
            </h1>
            <Button className="btn-danger" onClick={login}>
              Login
            </Button>
          </>
        )}

        <Button onClick={signGoogle} className="buttonGoogle">
          <FcGoogle /> Sign In With Googe
        </Button>
      </div>
    </div>
  );
};

export default Login;
