import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthUser = () => {
//   const navigate = useNavigate();

//   const getToken = () => {
//     const tokenString = sessionStorage.getItem("token");
//     const userToken = JSON.parse(tokenString);
//     return userToken;
//   };

//   const [token, setToken] = useState(getToken());

//   const saveToken = (token) => {
//     sessionStorage.setItem("token", JSON.stringify(token));

//     setToken(token);
//     navigate("/cryptocurrencies");
//   };

//   // const logout = () => {
//   //   sessionStorage.clear();
//   //   navigate("/login");
//   // };

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const http = axios.create({
  baseURL: `${baseUrl}`,
});

//   return { http, setToken: saveToken, token };
// };

// export default AuthUser;
