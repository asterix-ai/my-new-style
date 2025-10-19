import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, projectId } from '../services/firebase';
import toast from 'react-hot-toast';
import { getFirebaseErrorMessage } from '../utils/authUtils';

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [isMember, setIsMember] = useState(false);

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed: ", currentUser ? currentUser.uid : "No user");
      setUser(currentUser);
      setLoading(true);
      if (currentUser) {
        // Fetch user roles
        const memberDocRef = doc(db, `projects/${projectId}/members`, currentUser.uid);
        const memberUnsubscribe = onSnapshot(memberDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserRoles(data.roles || []);
            setIsMember(true);
            console.log("User roles fetched: ", data.roles);
          } else {
            setUserRoles([]);
            setIsMember(false);
            console.log("User is not a member of this project.");
          }
          setLoading(false);
        }, (err) => {
          console.error("Error fetching user roles:", err);
          setError(err.message);
          setUserRoles([]);
          setIsMember(false);
          setLoading(false);
        });

        return () => memberUnsubscribe();
      } else {
        setUserRoles([]);
        setIsMember(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('تم تسجيل الدخول بنجاح! 🎉');
    } catch (e) {
      console.error("Sign In Error:", e);
      setError(getFirebaseErrorMessage(e));
      toast.error(getFirebaseErrorMessage(e), { icon: '🚨' });
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Add user to members subcollection for tenant isolation
      const memberDocRef = doc(db, `projects/${projectId}/members`, newUser.uid);
      await setDoc(memberDocRef, { 
        email: newUser.email, 
        roles: ['member'], // Default role for new sign-ups
        createdAt: new Date() 
      });

      toast.success('تم إنشاء حساب بنجاح! 🎉');
    } catch (e) {
      console.error("Sign Up Error:", e);
      setError(getFirebaseErrorMessage(e));
      toast.error(getFirebaseErrorMessage(e), { icon: '🚨' });
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await firebaseSignOut(auth);
      toast.success('تم تسجيل الخروج بنجاح!');
    } catch (e) {
      console.error("Sign Out Error:", e);
      setError(getFirebaseErrorMessage(e));
      toast.error(getFirebaseErrorMessage(e), { icon: '🚨' });
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    isAuthenticated,
    isMember,
    userRoles,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    projectId,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(FirebaseContext);
};
