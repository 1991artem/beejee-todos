import axios from "axios";

const BASE_URL = 'http://192.168.0.101:4500/api/v1/';

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  }
});