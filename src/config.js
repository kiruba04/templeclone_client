// src/config.js
// Use environment variable if available, otherwise default to localhost
export const API_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8080';

