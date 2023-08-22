import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import API from "../../services/API";
import { getCurrentUser } from "../../redux/features/auth/authActions";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  // get user current
  const getUser = async () => {
    try {
      const response = await API.get("/auth/current-user");
      if (response?.data?.success) {
        dispatch(getCurrentUser(response.data));
      }
    } catch (err) {
      localStorage.clear();
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  });

  if (localStorage.getItem("token")) {
    return children; // User is authenticated, render the protected content
  } else {
    return <Navigate to="/login" />; // User is not authenticated, redirect to login
  }
};

export default ProtectedRoute;
