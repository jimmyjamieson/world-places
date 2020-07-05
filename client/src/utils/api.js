import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 1000000,
});

// Continents

export const getContinents = () => {
  return api('continents');
};

export const saveContinent = (input = {}) => {
  return api.post('continents', input)
}

export const deleteContinent = (id) => {
  return api.delete(`continents/${id}`)
}

// Countries

export const getCountries = () => {
  return api('countries');
};

export const saveCountry = (input = {}) => {
  return api.post('countries', input)
}

export const deleteCountry = (id) => {
  return api.delete(`countries/${id}`)
}