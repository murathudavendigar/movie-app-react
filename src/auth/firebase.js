import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => signInWithPopup(auth,provider)

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
