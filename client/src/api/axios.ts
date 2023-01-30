import axios from "axios";

const BASE_URL = 'https://beejee-todos-server.fly.dev/api/v1/';

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  }
});