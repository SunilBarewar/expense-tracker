import React, { createContext, useReducer, useEffect } from "react";
import { authActions } from "../constants/actionTypes";
// Define the initial state
const initialState = JSON.parse(localStorage.getItem("user")) || null;

// Create the authentication context
export const AuthContext = createContext();

// Reducer function to manage authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case authActions.SET_TOKEN:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    case authActions.LOGOUT:
      localStorage.removeItem("user");
      return null;
    case authActions.UPDATE_TOTALEXPENSE:
      const updatedState = {
        ...state,
        totalExpense: state.totalExpense + action.payload,
      };
      localStorage.setItem("user", JSON.stringify(updatedState));
      return updatedState;
    default:
      return state;
  }
};

// AuthContextProvider component
const AuthContextProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
