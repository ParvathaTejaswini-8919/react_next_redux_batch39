import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export function getApiError(error) {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return "The product service took too long to respond. Please try again.";
    }
    if (!error.response) {
      return "Could not connect to the product service. Make sure json-server is running.";
    }
    return error.response.data?.message || `Request failed (${error.response.status}). Please try again.`;
  }
  return "An unexpected error occurred. Please try again.";
}

export default api;