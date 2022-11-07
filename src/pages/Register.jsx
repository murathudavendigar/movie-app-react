import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import { LoginContext } from "../context/AuthContext";
const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();
  const { userContext, setUserContext } = useContext(LoginContext);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      setUserContext({
        email: registerEmail,
        password: registerPassword,
      });

      console.log(user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
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
  );
};

export default Register;
