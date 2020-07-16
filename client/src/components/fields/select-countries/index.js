import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getCountries } from '../../../utils/api';

const SelectCountries = ({ onChange, name }) => {
  const [ data, setData ] = useState([])

  const fetchData = async() => {
    const data = await getCountries()
    return data.data
  }

  useEffect(() => {
    fetchData().then((data) => {
      setData(data)
    })
  }, [])

  return (
    <Autocomplete
      id="combo-box-demo"
      options={data}
      onChange={(event, newValue) => {
        onChange({
          target: {
            name: name || 'country',
            value: newValue.id
          }
        });
      }}
      getOptionLabel={option => option.name}
      renderInput={params => (
        <TextField
          {...params}
          type="text"
          name="continent"
          label="Continent"
          variant="outlined"
          fullWidth
          required
        />
      )}
    />
  );
};

export default SelectCountries;
