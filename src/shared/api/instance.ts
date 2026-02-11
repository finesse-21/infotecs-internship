import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: 'https://698cd8cb21a248a27362bff4.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
});
