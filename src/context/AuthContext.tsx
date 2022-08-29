import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

interface AuthContext {
  signUp: (email: string, password: string) => Promise<any> | void;
  logIn: (email: string, password: string) => Promise<any>;
  // logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => void;
  user?: FirebaseUser | null;
}

// export interface AuthInfo {
//   id_token: string;
//   access_token: string;
//   expires_in: string;
//   token_type: string;
// }

const AuthContext = createContext<AuthContext | null>(null);

interface ContextInterface {
  children?: ReactNode;
  // any props that come into the component
}

export function AuthContextProvider({ children }: ContextInterface) {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  function signUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", email), {
      savedShows: [],
    });
  }

  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

// export function UserAuth() {
//   return useContext(AuthContext);
// }

export function useAuthContext() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("Context Value Undefined!");
  }
  return value;
}

export default AuthContext;
