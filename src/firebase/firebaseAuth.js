// src/firebase/firebaseAuth.js
import {app} from './firebaseConfig';
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return await result.user.getIdToken(); // Firebase ID token
};

export const signInWithMicrosoft = async () => {
  const provider = new OAuthProvider('microsoft.com');
  const result = await signInWithPopup(auth, provider);
  return await result.user.getIdToken();
};
