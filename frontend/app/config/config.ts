// config/config.ts

const isDevelopment = process.env.NODE_ENV === "development";
console.log("NODE_ENV:", isDevelopment);
const config = {
  apiBaseUrl: isDevelopment
    ? "http://localhost:5000" // API URL for local development
    : "https://your-production-api-url.com", // API URL for production
};

export default config;
