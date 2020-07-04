import React, { useState } from 'react';
import { saveContinent } from '../../../utils/api';

const ContinentsForm = ({ onSuccess, onError }) => {
  const [data, setData] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await saveContinent(data);
      onSuccess();
    } catch (e) {
      onError();
    }
  };

  const handleInput = event => {
    const { target = {} } = event;
    const { name, value } = target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleInput}
        required
      />
      <input
        type="text"
        name="nativeName"
        placeholder="Native Name"
        onChange={handleInput}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ContinentsForm;
