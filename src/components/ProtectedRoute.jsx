import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const allowedUID = import.meta.env.VITE_ADMIN_UID;
 
      if (currentUser && currentUser.uid === allowedUID) {
        setUser(currentUser);
      } else {
        setUser(null);
      }

      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;