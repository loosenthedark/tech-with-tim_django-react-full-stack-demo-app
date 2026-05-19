import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";

const ProtectedRoute = ({ children }) => {
  const [isAuthorised, setIsAuthorised] = useState(null);

  useEffect(() => {
    // Call auth fn as soon as protected route gets loaded to check for access/refresh token in LS
    auth().catch(() => setIsAuthorised(false));
  }, []);

  // Automatically refreshes access token as required
  const refresh = async () => {
    const token = localStorage.getItem(REFRESH_TOKEN);
    try {
      const resp = await api.post("/api/token/refresh/", {
        refresh: token,
      });
      // Check for successful request
      if (resp.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, resp.data.access);
        setIsAuthorised(true);
      } else {
        setIsAuthorised(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorised(false);
    }
  };

  // Checks whether or not access token needs to be refreshed
  const auth = async () => {
    // Check...
    // (i) to see if we have an access token
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorised(false);
      return;
    }
    // (ii) whether or not it has expired
    const decodedToken = jwtDecode(token);
    const tokenExpiration = decodedToken.exp;
    // NB: Need to get current date in SECONDS (not milliseconds!)
    const now = Date.now() / 1000;
    // Idea being token refresh (if required) will just happen under the hood, without bothering the end user
    if (tokenExpiration < now) {
      await refresh();
    } else {
      setIsAuthorised(true);
    }
  };

  // Initial (loading) state in UI - while token check (+/- refresh) is being performed
  if (isAuthorised === null) {
    return <div>Loading...</div>;
  }

  return isAuthorised ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
