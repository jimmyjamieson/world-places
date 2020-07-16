import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 1000000,
});

/**
 * Countries
 * @returns {AxiosPromise}
 */

export const getCountries = () => {
  return api('countries?join=relation');
};

export const saveCountry = (input = {}) => {
  return api.post('countries', input)
}

export const updateCountry = (input = {}) => {
  return api.patch(`countries/${input.id}`, input)
}

export const deleteCountry = (id) => {
  return api.delete(`countries/${id}`)
}