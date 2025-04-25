import axios from "axios";

export const loginCall = async (userCreds, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      userCreds
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
