import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getContinents } from '../../../utils/api';

const SelectContinents = ({ onChange, name }) => {
  const [ data, setData ] = useState([])

  const fetchData = async() => {
    const data = await getContinents()
    return data.data
  }

  useEffect(() => {
    fetchData().then((data) => {
      setData(data)
    })
  }, [])

  console.log('data', data)

  return (
    <Autocomplete
      id="combo-box-demo"
      options={data}
      onChange={(event, newValue) => {
        onChange({
          target: {
            name: name || 'continent',
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

export default SelectContinents;
