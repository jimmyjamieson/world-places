import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 1000000,
});

/**
 * Countries
 * @returns {AxiosPromise}
 */

export const getCountries = (params) => {
  return api('countries', params);
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

/**
 * Regions
 */

export const getRegions = (params) => {
  console.log('params', params)
  return api('regions', { params });
};