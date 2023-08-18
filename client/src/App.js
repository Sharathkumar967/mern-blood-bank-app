import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";

const App = () => {
  return (
    // <div>
    //   <ToastContainer />
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    //         <ProtectedRoute>
    //           <HomePage />
    //         </ProtectedRoute>
    //       }
    //     />

    //     <Route
    //       path="/login"
    //       element={
    //         <PublicRoute>
    //           <Login />
    //         </PublicRoute>
    //       }
    //     />
    //     <Route
    //       path="/register"
    //       element={
    //         <PublicRoute>
    //           <Register />
    //         </PublicRoute>
    //       }
    //     />

    //     {/* <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} /> */}
    //   </Routes>
    // </div>

    <div>
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
