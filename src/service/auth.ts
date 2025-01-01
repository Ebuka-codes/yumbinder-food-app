import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, provider } from './firebase';

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const signUpUser = async (email: string, password: string) => {
  try {
    const newUserCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUser = newUserCredentials.user;
    return newUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const resetPassword = async (email: string) => {
  try {
    const data = await sendPasswordResetEmail(auth, email);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
