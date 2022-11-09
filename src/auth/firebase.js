import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toastSuccessNotify } from "../helpers/ToastNotify";

const firebaseConfig = {
  apiKey: "AIzaSyDifcJXfsKnLaX4-3aBAvGMePvVJmHBRZ0",
  authDomain: "movie-app-fa824.firebaseapp.com",
  projectId: "movie-app-fa824",
  storageBucket: "movie-app-fa824.appspot.com",
  messagingSenderId: "479817636482",
  appId: "1:479817636482:web:18f9e1a1184517f15cf29b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// export const signInWithGoogle = () => signInWithPopup(auth,provider)

export const createUser = async (email, password, navigate, displayName) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //! kullanıcı profilini güncelleme

    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/");
    toastSuccessNotify("Registered successfully!");
    console.log(userCredential);
  } catch (error) {
    alert(error.message);
  }
};

//! Email/password ile giriş
export const signIn = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    toastSuccessNotify("Logged in successfully!");
  } catch (error) {
    alert(error.message);
  }
};

export const userObserver = (setCurrentUser) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu.
  //! Derste anlatıldı !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setCurrentUser({ email, displayName, photoURL });
      console.log(user);
    } else {
      setCurrentUser(false);
      console.log("user signed out");
    }
  });
};

export const logOut = () => {
  signOut(auth);
};

//! Google ile giriş

export const signUpGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  //! Popup ile giriş
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
};
