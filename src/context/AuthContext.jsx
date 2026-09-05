import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");
  const [authModalRole, setAuthModalRole] = useState("student");

  /*
   * ----------------------------------------------------
   * Restore Firebase authentication session
   * ----------------------------------------------------
   */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setCurrentUser(null);
        setCurrentRole(null);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const profile = userSnapshot.data();

          const user = {
            id: firebaseUser.uid,
            uid: firebaseUser.uid,
            name: profile.name || firebaseUser.displayName || "",
            email: firebaseUser.email,
            role: profile.role,
            avatar:
              profile.avatar ||
              firebaseUser.photoURL ||
              null,
            ...profile,
          };

          setCurrentUser(user);
          setCurrentRole(profile.role);
        } else {
          /*
           * Authentication account exists,
           * but Nexura profile doesn't exist yet.
           */
          setCurrentUser({
            id: firebaseUser.uid,
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || "",
            email: firebaseUser.email,
            avatar: firebaseUser.photoURL || null,
            role: null,
          });

          setCurrentRole(null);
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /*
   * ----------------------------------------------------
   * EMAIL / PASSWORD SIGNUP
   * ----------------------------------------------------
   */

  const signup = async (formData) => {
    try {
      const role = formData.role || "student";

      /*
       * Admin cannot be created through public signup.
       */
      if (role === "admin") {
        return {
          success: false,
          message: "Admin accounts cannot be created through signup.",
        };
      }

      /*
       * Create Firebase Authentication account.
       */
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

      const firebaseUser = userCredential.user;

      /*
       * Create Nexura profile in Firestore.
       */
      const userProfile = {
        name: formData.name,
        email: formData.email,
        role: role,

        college: formData.college || "",
        company: formData.company || "",
        department: formData.department || "",

        avatar: null,

        authProvider: "password",

        isActive: true,

        createdAt: serverTimestamp(),
      };

      await setDoc(
        doc(db, "users", firebaseUser.uid),
        userProfile
      );

      /*
       * Firebase automatically signs the user in
       * after successful account creation.
       */

      setAuthModalOpen(false);

      return {
        success: true,
        user: {
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          ...userProfile,
        },
      };
    } catch (error) {
      console.error("Signup error:", error);

      let message = "Unable to create account.";

      if (error.code === "auth/email-already-in-use") {
        message = "An account with this email already exists.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      }

      return {
        success: false,
        message,
      };
    }
  };

  /*
   * ----------------------------------------------------
   * EMAIL / PASSWORD LOGIN
   * ----------------------------------------------------
   */

  const login = async (email, password, role) => {
    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const firebaseUser = userCredential.user;

      /*
       * Get Nexura profile.
       */
      const userRef = doc(db, "users", firebaseUser.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        await signOut(auth);

        return {
          success: false,
          message: "Nexora profile not found.",
        };
      }

      const profile = userSnapshot.data();

      /*
       * Check selected role against database role.
       */
      if (role && profile.role !== role) {
        await signOut(auth);

        return {
          success: false,
          message: "Selected role does not match this account.",
        };
      }

      const user = {
        id: firebaseUser.uid,
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: profile.name || firebaseUser.displayName || "",
        avatar:
          profile.avatar ||
          firebaseUser.photoURL ||
          null,
        ...profile,
      };

      setCurrentUser(user);
      setCurrentRole(profile.role);
      setAuthModalOpen(false);

      return {
        success: true,
        user,
      };
    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        message: "Invalid email or password.",
      };
    }
  };

  /*
   * ----------------------------------------------------
   * GOOGLE LOGIN / SIGNUP
   * ----------------------------------------------------
   */

  const loginWithGoogle = async (role = "student") => {
    try {
      /*
       * Admin accounts cannot be created through
       * public Google authentication.
       */
      if (role === "admin") {
        return {
          success: false,
          message: "Admin accounts cannot be created through Google signup.",
        };
      }

      /*
       * Open Google sign-in popup.
       */
      const userCredential =
        await signInWithPopup(auth, googleProvider);

      const firebaseUser = userCredential.user;

      /*
       * Check whether this Google account already
       * has a Nexura profile.
       */
      const userRef = doc(db, "users", firebaseUser.uid);
      const userSnapshot = await getDoc(userRef);

      let profile;

      if (userSnapshot.exists()) {
        /*
         * Existing Nexura user.
         */
        profile = userSnapshot.data();

        /*
         * Make sure the selected role matches
         * the role already stored in Nexura.
         */
        if (profile.role !== role) {
          await signOut(auth);

          return {
            success: false,
            message: "Selected role does not match this account.",
          };
        }
      } else {
        /*
         * New Google user.
         *
         * Create Nexura profile.
         */
        profile = {
          name: firebaseUser.displayName || "Nexora User",
          email: firebaseUser.email,
          role: role,

          college: "",
          company: "",
          department: "",

          avatar: firebaseUser.photoURL || null,

          authProvider: "google",

          isActive: true,

          createdAt: serverTimestamp(),
        };

        await setDoc(userRef, profile);
      }

      const user = {
        id: firebaseUser.uid,
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name:
          profile.name ||
          firebaseUser.displayName ||
          "Nexora User",
        avatar:
          profile.avatar ||
          firebaseUser.photoURL ||
          null,
        ...profile,
      };

      setCurrentUser(user);
      setCurrentRole(profile.role);
      setAuthModalOpen(false);

      return {
        success: true,
        user,
      };
    } catch (error) {
      console.error("Google authentication error:", error);

      let message = "Google authentication failed.";

      if (error.code === "auth/popup-closed-by-user") {
        message = "Google sign-in was cancelled.";
      } else if (error.code === "auth/popup-blocked") {
        message = "The Google sign-in popup was blocked by your browser.";
      } else if (error.code === "auth/account-exists-with-different-credential") {
        message =
          "An account already exists with this email using another sign-in method.";
      }

      return {
        success: false,
        message,
      };
    }
  };

  /*
   * ----------------------------------------------------
   * LOGOUT
   * ----------------------------------------------------
   */

  const logout = async () => {
    try {
      await signOut(auth);

      setCurrentUser(null);
      setCurrentRole(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  /*
   * ----------------------------------------------------
   * UPDATE PROFILE
   * ----------------------------------------------------
   */

  const updateProfile = async (fields) => {
    if (!auth.currentUser) {
      return;
    }

    try {
      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        fields,
        {
          merge: true,
        }
      );

      setCurrentUser((prev) => ({
        ...prev,
        ...fields,
      }));
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  /*
   * ----------------------------------------------------
   * AUTH MODAL
   * ----------------------------------------------------
   */

  const openAuth = (mode = "login", role = "student") => {
    setAuthModalMode(mode);
    setAuthModalRole(role);
    setAuthModalOpen(true);
  };

  const closeAuth = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        loading,

        login,
        signup,
        loginWithGoogle,
        logout,

        updateProfile,

        authModalOpen,
        authModalMode,
        authModalRole,

        openAuth,
        closeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);