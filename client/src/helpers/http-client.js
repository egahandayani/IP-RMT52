import axios from "axios";

const ipApi = axios.create({
  baseURL: "http://localhost:3000",
});

export default ipApi;
