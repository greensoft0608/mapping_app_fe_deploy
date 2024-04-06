import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

let accessToken = '';

if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('accessToken') as string;
}

export const axiosPublic = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    'x-access-token': accessToken,
    'Content-Type': 'application/json',
  },
});
