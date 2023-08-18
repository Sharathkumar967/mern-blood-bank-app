import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";

import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "auth/login",

  async ({ role, email, password }, { rejectWithValue }) => {
    const data = {
      role: role,
      email: email,
      password: password,
    };
    try {
      const response = await API.post("/auth/login", data);
      console.log("response", response);
      if (response.data.success === true) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      }
      return response;
    } catch (err) {
      if (err.response && err.response.data.message) {
        toast.error(err.response.data.message);
        return rejectWithValue(err.response.data.message);
      } else {
        toast.error(err.message);
        return rejectWithValue(err.message);
      }
    }
  }
);

// register

export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      hospitalName,
      website,
      address,
      organizationName,
      phone,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await API.post("/auth/register", {
        name,
        role,
        email,
        password,
        hospitalName,
        website,
        address,
        organizationName,
        phone,
      });
      console.log("response testing", response);
      if (response?.data?.success) {
        toast.success("User Registered Succesfully");
        setTimeout(() => {
          window.location.replace("/login");
        }, 1000);
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const response = await API.get("/auth/current-user");
      if (response?.data) {
        return response?.data;
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);
