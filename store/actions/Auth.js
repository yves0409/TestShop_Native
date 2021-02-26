export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
const { API_KEY } = require("../../keys");

//SIGNUP
export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Oops!, Something went wrong"; //default message

      if (errorId === "EMAIL_EXCISTS") {
        message = "Email Already Excists";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
  };
};

//LOGIN
export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Oops!, Something went wrong"; //default message

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "Email Not Found";
      }
      if (errorId === "INVALID_PASSWORD") {
        message = "Incorrect Password";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    console.log(resData);
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};
