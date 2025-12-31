import axios from "axios";


const PORT = process.env.API_PORT || (process.env.NODE_ENV === 'production' ? 3002 : 3001);

export const apiClient = axios.create({
  baseURL: `http://localhost:${PORT}`,
  headers: {
    "Content-Type": "application/json",
  },
});



