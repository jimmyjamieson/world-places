import React, { useState } from 'react';
import { saveContinent } from '../../../utils/api';
import Modal from '../modal';

const ContinentsForm = ({ onSuccess, onError, open }) => {
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
    <Modal open={ open }>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="code"
          placeholder="Code"
          onChange={handleInput}
          required
        />
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
        <input
          type="text"
          name="coords"
          placeholder="2.194216,5.2010515"
          onChange={handleInput}
          required
        />
        <button type="submit">Save</button>
      </form>
    </Modal>
  );
};

export default ContinentsForm;
