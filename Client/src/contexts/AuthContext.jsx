import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "67ff2c7ee54868b8d260833b",
    username: "john_doe",
    email: "john@example.com",
    password: "$2b$10$wzQc4LZV.Y3iLajgjad9SOOAKWd.sTyPorN4kZZGgLKTeNiDltxx.",
    profilePicture: "default dp",
    followers: [],
    following: [
      "67ff2e4b0a65392c592e4bb3",
      "67ff2fba0a65392c592e4bb6",
      "67ff2fba0a65392c592e4bb7",
      "67ff2fba0a65392c592e4bb8",
      "67ff2fba0a65392c592e4bb9",
      "67ff2fba0a65392c592e4bba",
      "67ff2fba0a65392c592e4bbb",
      "67ff2fba0a65392c592e4bbc",
    ],
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
