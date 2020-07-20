import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api'
});

/**
 * Countries
 */

export const getCountries = params => {
  return api('countries', { params });
};

export const getCountry = id => {
  return api(`countries/${id}`)
};

export const createCountry = (input = {}) => {
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

/**
 * Cities
 */

export const getCities = params => {
  return api('cities', { params });
};

export const getCity = id => {
  return api(`cities/${id}`)
};

export const createCity = (input = {}) => {
  return api.post('cities', input);
};

export const updateCity = (input = {}) => {
  return api.patch(`cities/${input.id}`, input);
};

export const deleteCity = id => {
  return api.delete(`cities/${id}`);
};


/**
 * Languages
 */

export const getLanguages = params => {
  return api('languages', { params });
};

export const getLanuage = id => {
  return api(`languages/${id}`)
};

export const createLanguage = (input = {}) => {
  return api.post('languages', input);
};

export const updateLanguage = (input = {}) => {
  return api.patch(`languages/${input.id}`, input);
};

export const deleteLanguage = id => {
  return api.delete(`languages/${id}`);
};


/**
 * Currencies
 */

export const getCurrencies = params => {
  return api('currencies', { params });
};

export const getCurrency = id => {
  return api(`currencies/${id}`)
};

export const createCurrency = (input = {}) => {
  return api.post('currencies', input);
};

export const updateCurrency = (input = {}) => {
  return api.patch(`currencies/${input.id}`, input);
};

export const deleteCurrency = id => {
  return api.delete(`currencies/${id}`);
};