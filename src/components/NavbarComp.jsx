import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import { LoginContext } from "../context/AuthContext";

const NavbarComp = () => {
  const navigate = useNavigate();

  const { userContext, setUserContext } = useContext(LoginContext);

  const logOut = async () => {
    await signOut(auth);
    localStorage.clear();
    setUserContext({ email: "", password: "" });
  };

  console.log(userContext);

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/">
            Movie App <small className="fs-6">Captain Price</small>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {!userContext.email && !localStorage.getItem("name") ? (
              <Button className="me-2" onClick={() => navigate("/login")}>
                Login
              </Button>
            ) : (
              <Button className="me-2" onClick={() => logOut()}>
                Logout
              </Button>
            )}
            <Button>Register</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1 className="text-center">
        {userContext.email || localStorage.getItem("name")}
      </h1>
    </>
  );
};

export default NavbarComp;
