import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 1000000,
});

/**
 * Countries
 */

export const getCountries = params => {
  return api('countries', params);
};

export const saveCountry = (input = {}) => {
  return api.post('countries', input);
};

export const updateCountry = (input = {}) => {
  return api.patch(`countries/${input.id}`, input);
};

export const deleteCountry = id => {
  return api.delete(`countries/${id}`);
};

/**
 * Regions
 */

export const getRegions = params => {
  return api('regions', { params });
};

export const getRegion = id => {
  return api(`regions/${id}`)
};

export const createRegion = (input = {}) => {
  const params = {
    ...input,
    countryCode: input?.country?.code
  }
  return api.post('regions', params);
};

export const updateRegion = (input = {}) => {
  const params = {
    ...input,
    countryCode: input?.country?.code
  }
  return api.patch(`regions/${input.id}`, params);
};

export const deleteRegion = id => {
  return api.delete(`regions/${id}`);
};
