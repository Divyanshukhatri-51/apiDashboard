// src/api/usersApi.js
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchUsersApi = () =>
  axios.get(`${BASE_URL}/users`); // GET users list[web:2][web:9]
