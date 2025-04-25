import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "68023e7245ef5c360883e700",
    username: "login test",
    email: "login@gmail.com",
    password: "$2b$10$P.afvxLYu/9Neu0Xfnnpg.V7l2gZJvRqsDpJBtKdm2guPedrMUBIe",
    profilePicture: "default dp",
    followers: [],
    following: ["67ff2c7ee54868b8d260833b"],
  },
  isFetching: false,
  error: false,
};
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
