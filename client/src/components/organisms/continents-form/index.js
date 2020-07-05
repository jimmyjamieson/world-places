import React, { useState } from 'react';
import { saveContinent } from '../../../utils/api';
import Modal from '../modal';
import TextField from '@material-ui/core/TextField';
import handleApiError from '../../../utils/handle-api-error';

const ContinentsForm = ({ onSuccess, open, close }) => {
  const [fields, setField] = useState({});
  const [message, setMessage] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await saveContinent(fields);
      setField({})
      setMessage(null)
      onSuccess();
    } catch (error) {
      const err = await handleApiError(error)
      setMessage(err.message)
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


  return (
    <Modal
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
        defaultValue={ fields.code }
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
    </Modal>
  );
};

export default ContinentsForm;
