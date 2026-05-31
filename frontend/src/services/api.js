import axios from "axios";

const api = axios.create({
  baseURL: "https://hirewise-ai-uk23.onrender.com/api",
});

export default api;