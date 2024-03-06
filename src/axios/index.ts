import axios from 'axios';
let BASE_URL: string;

if (typeof window !== "undefined") {
  // Client-side-only code
  BASE_URL = window?.location?.hostname === 'localhost' ? 'http://localhost:5000' : 'https://server.ironcodeman.com';
} else {
  BASE_URL = 'https://server.ironcodeman.com';
}

//https://www.youtube.com/watch?v=w9eOvKdk5wM
export const axiosFetch = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// console.log(window.localStorage.getItem('theologianjwt'));
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Cache-Control': 'no-cache',
  },
  withCredentials: true,
});
