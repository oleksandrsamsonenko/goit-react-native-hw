import auth from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { authSlice } from "./authReducer";

const { updateUserInfo, userSignOut } = authSlice.actions;

export const authSignIn = (email, password) => async (dispatch, getState) => {
  // console.log("AUTH ", email, password);
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    // console.log(user);
    dispatch(
      updateUserInfo({
        userID: user.uid,
        email: user.email,
        nickname: user.displayName,
        // photoURL: user.photoURL,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const authSignUp =
  (email, password, nickname) => async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const updated = await updateProfile(auth.currentUser, {
        displayName: nickname,
        // photoURL:
        //   "https://www.film.ru/sites/default/files/people/2585937-998375.jpg",
      });
      dispatch(
        updateUserInfo({
          userID: user.uid,
          email: user.email,
          nickname: nickname,
          // photoURL:
          //   "https://www.film.ru/sites/default/files/people/2585937-998375.jpg",
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const authSignOut = () => async (dispatch, getState) => {
  try {
    const response = await signOut(auth);
    // console.log(response);
    dispatch(userSignOut());
  } catch (error) {
    console.log(error);
  }
};
