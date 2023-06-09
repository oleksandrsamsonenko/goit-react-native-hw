import firebase from "../../firebase/config";
import { mainSlice } from "./mainReducer";

import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const { setPostsList } = mainSlice.actions;

export const getPosts = () => async (dispatch) => {
  const base = getFirestore(firebase);
  try {
    let list = [];
    const querySnapshot = await getDocs(collection(base, "posts"));
    querySnapshot.forEach((doc) => {
      list.push({ ...doc.data(), postId: doc.id });
      // console.log(doc.id, " => ", doc.data());
    });
    dispatch(setPostsList(list));
  } catch (error) {
    console.log(error);
  }
};
