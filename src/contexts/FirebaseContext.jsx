import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth'
// import { getFunctions, httpsCallable } from "firebase/functions";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// project imports
import Loader from 'ui-component/Loader';

import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// firebase initialize
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
// const functions = getFunctions(app, 'us-central1');

// const
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          let auth_user = await user.getIdTokenResult(true);
          localStorage.setItem('token', auth_user.token);
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                id: user.uid,
                token: auth_user.token,
                role: auth_user.claims["https://hasura.io/jwt/claims"]?.["x-hasura-default-role"] || 'admin',
                email: user.email,
                name: user.displayName || ''
              }
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  const firebaseEmailPasswordSignIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const firebaseGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  };

  const firebaseRegister = async (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const logout = () => {
    signOut(auth);
    localStorage.clear();
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateProfile = () => { };
  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  };

  //functions
  // const AddUser = (data) => addUser(data);
  // const UpdateUser = (data) => updateUser(data);
  // const DeleteUser = (data) => deleteUser(data);

  //storage
  const UploadImage = async (file, name, route) => {
    const metadata = {
      contentType: 'image/jpeg'
    };

    const storageRef = ref(storage, `${route}/` + name);
    const uploadTask = await uploadBytesResumable(storageRef, file, metadata);
    const downloadLink = await getDownloadURL(uploadTask.ref);

    return downloadLink
  }

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        firebaseRegister,
        firebaseEmailPasswordSignIn,
        login: () => { },
        firebaseGoogleSignIn,
        logout,
        resetPassword,
        updateProfile,
        // AddUser,
        // UpdateUser,
        // DeleteUser,
        UploadImage,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node
};

export default FirebaseContext;
