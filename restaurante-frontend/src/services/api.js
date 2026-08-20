import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getPlatos() {
  const response = await axios.get(`${BASE_URL}/api/platos`);
  return response.data;
}