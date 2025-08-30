const LOCAL_API_BASE_URL = "http://localhost:8080";   // your local backend
const PROD_API_BASE_URL = "https://task-tracker-1lxu.onrender.com"; // deployed backend

// Decide which base URL to use
const API_BASE_URL =
    window.location.hostname === "localhost" ? LOCAL_API_BASE_URL : PROD_API_BASE_URL;

console.log("BASE_URL:======"+API_BASE_URL)
export default API_BASE_URL;
