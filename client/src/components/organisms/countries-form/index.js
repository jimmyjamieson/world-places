import React, { useState, useEffect } from 'react';
import { saveCountry } from '../../../utils/api';
import FormModal from '../../molecules/form-modal';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import handleApiError from '../../../utils/handle-api-error';
import SelectContinents from '../../fields/select-continents';

const CountriesForm = ({ onSuccess, open, close }) => {
  const [fields, setField] = useState({});
  const [message, setMessage] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await saveCountry(fields);
      setField({});
      setMessage(null);
      onSuccess();
    } catch (error) {
      const err = await handleApiError(error);
      setMessage(err.message);
    }
  };

  const handleInput = event => {
    const { target = {} } = event;
    const { name, value } = target;
    setField({
      ...fields,
      [name]: value,
    });
  };

  console.log('fields', fields)

  return (
    <FormModal
      open={open}
      close={close}
      name="Add Continent"
      handleSubmit={handleSubmit}
    >
      {message && message}
      <TextField
        name="code"
        label="Code"
        variant="outlined"
        defaultValue={fields.code}
        onChange={handleInput}
        fullWidth
        required
      />
      <TextField
        type="text"
        name="name"
        label="Name"
        variant="outlined"
        fullWidth
        onChange={handleInput}
        required
      />
      <TextField
        type="text"
        name="nativeName"
        label="Native Name"
        variant="outlined"
        fullWidth
        onChange={handleInput}
        required
      />
      <TextField
        type="text"
        name="coords"
        label="GeoCoords"
        helperText="2.194216,5.2010515"
        variant="outlined"
        fullWidth
        onChange={handleInput}
        required
      />
      <SelectContinents name="continent" onChange={ handleInput } />
    </FormModal>
  );
};

export default CountriesForm;
