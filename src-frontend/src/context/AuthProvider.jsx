import { useState, useEffect } from "react";
import AuthContext from "./AuthContext.jsx";
import JoblyApi from "../helper/api";
import Cookies from "js-cookie"
import {jwtDecode} from "jwt-decode"

// Component to create Context provider to the main app with user authentication functionality
const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const [token, setToken] = useState(
    Cookies.get("token") ? JSON.parse(Cookies.get("token")) : ""
  );
  const [err, setErr] = useState([]);

  // Internal function to update user data stored in Context
  const updateUserData = async () => {
    JoblyApi.token = token;
    try {
      const username = jwtDecode(token).username;
      const response = await JoblyApi.getUser(username);
      setUserData(response.user);
    } catch (error) {
      console.error(error);
    }
  };

  // Save user information in Context upon starting and when JWT token is changed
  useEffect(() => {
    token === "" ? setUserData("") : updateUserData();
  }, [token]);

  // Context function to execute user Login based on given credentials.
  // Credentials should be {username:"", password:""}
  const login = async (credentials) => {
    try {
      const response = await JoblyApi.login(credentials);
      Cookies.set("token", JSON.stringify(response));
      setToken(response);
      return true;
    } catch (error) {
      setErr(error);
      return false;
    }
  };

  // Context function to register new user (sign up)
  // Registration data should be:
  // {username:"", password:"", firstName:"",lastName:"",email:""}
  const signup = async (data) => {
    try {
      const response = await JoblyApi.signup(data);
      Cookies.set("token", JSON.stringify(response));
      setToken(response);
      return true;
    } catch (error) {
      setErr(error);
      return false;
    }
  };

  // Context function to perform user logout
  const logout = () => {
    Cookies.remove("token");
    setToken("");
    return true;
  };

  // Context function to update user information
  // Accepted data to be updated
  const updateUser = async (data) => {
    try {
      const username = jwtDecode(token).username;
      const response = await JoblyApi.patchUser(username, data);
      if (response) {
        updateUserData()
      };
      return true;
    } catch (error) {
      setErr(error);
      return false;
    }
  };

  // Context function to apply for job
  const applyJob = async (jobId) => {
    try {
      const username = jwtDecode(token).username;
      const response = await JoblyApi.apply(username, jobId);
      if (response) {
        updateUserData();
      }
      return true;
    } catch (error) {
      setErr(error);
      return false;
    }
  };

  // Context function to clear errors stored in error state variable
  const clearError = () => {
    setErr([]);
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        err,
        login,
        signup,
        logout,
        clearError,
        updateUser,
        applyJob,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider