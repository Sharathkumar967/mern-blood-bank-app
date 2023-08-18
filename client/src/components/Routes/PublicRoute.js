import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />; // User is authenticated, redirect to homepage
  } else {
    return children; // User is not authenticated, render the public content
  }
};

export default PublicRoute;
