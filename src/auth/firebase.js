import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/ToastNotify";

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
    toastErrorNotify(error.message);
    // alert(error.message);
  }
};

//! Email/password ile giriş
export const signIn = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    toastSuccessNotify("Logged in successfully!");
  } catch (error) {
    // alert(error.message);
    toastErrorNotify(error.message);
  }
};

export const userObserver = (setCurrentUser) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu.
  //! Derste anlatıldı !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setCurrentUser({ email, displayName, photoURL });
      // console.log(user);
    } else {
      setCurrentUser(false);
      // console.log("user signed out");
    }
  });
};

export const logOut = () => {
  signOut(auth);
  toastErrorNotify("Logged out successfully!");
};

//! Google ile giriş

export const signUpGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  //! Popup ile giriş
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
    })
    .catch((error) => {
      // Handle Errors here.
      // console.log(error);
      toastErrorNotify("Sorry. Try again!");
    });
};

export const forgotPassword = (email) => {
  //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      toastWarnNotify("Please check your mail box!");
      // alert("Please check your mail box!");
    })
    .catch((err) => {
      toastErrorNotify(err.message);
      // alert(err.message);
      // ..
    });
};
