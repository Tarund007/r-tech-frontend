import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default function PrivateRoute({ children }) {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL + "/auth/profile", { withCredentials: true })
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false));
  }, []);

  if (authorized === null) return null; // or show loading...
  return authorized ? children : <Navigate to="/admin/signin" replace />;
}
