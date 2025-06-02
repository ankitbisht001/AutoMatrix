import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/auth';

export const loginUser = async (email, password) => {
  return axios.post(`${BASE_URL}/login`, { email, password });
};

export const registerUser = async (name, email, password) => {
  return axios.post(`${BASE_URL}/signup`, { name, email, password });
};
