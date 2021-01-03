import { useHistory } from "react-router-dom";
import { getFirebase } from "react-redux-firebase";
import { firebase, reduxFirebase as rfConfig} from '../../config';
import {push} from 'react-router-redux';
import { useDispatch } from 'react-redux';


export const login = (email: any,password:any) => {
  const dispatch = useDispatch();
  const firebase = getFirebase();
 
  return ():any=> {
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then( (res:any) => {
      dispatch(push('/home')); 
    })
    .catch((err:any) => {
      console.error("Error signing in with password and email", err);
    })
  };
};

