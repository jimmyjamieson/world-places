import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 1000000,
});

export const getContinents = () => {
  return api('continents');
};

export const saveContinent = (input = {}) => {
  return api.post('continents', input)
}