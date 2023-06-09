import { getAuth } from "firebase/auth";
import firebase from "../../firebase/config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { authSlice } from "./authReducer";

const { updateUserInfo, userSignOut, authStateChange } = authSlice.actions;
const auth = getAuth(firebase);

export const authSignIn = (email, password) => async (dispatch, getState) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    // console.log("USER", user);
    dispatch(
      updateUserInfo({
        userID: user.uid,
        email: user.email,
        nickname: user.displayName,
        photoURL: user.photoURL,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const authSignUp =
  (email, password, nickname, photoURL) => async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: nickname,
        photoURL: photoURL,
      });
      dispatch(
        updateUserInfo({
          userID: user.uid,
          email: user.email,
          nickname: nickname,
          photoURL: photoURL,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const authSignOut = () => async (dispatch, getState) => {
  try {
    const response = await signOut(auth);
    dispatch(userSignOut());
  } catch (error) {
    console.log(error);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    // console.log(`USER `, user);
    if (user) {
      const userUpdateProfile = {
        nickName: user.displayName,
        userId: user.uid,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserInfo(userUpdateProfile));
    }
  });
};
