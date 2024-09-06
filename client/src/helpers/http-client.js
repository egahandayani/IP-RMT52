import axios from "axios";

const ipApi = axios.create({
  baseURL: "https://ip-rmt52.egahandayani.my.id",
});

export default ipApi;
