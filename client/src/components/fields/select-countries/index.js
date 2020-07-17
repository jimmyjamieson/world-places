import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getCountries } from '../../../utils/api';

const SelectCountries = ({ onChange, name, ...rest }) => {
  const [ data, setData ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)

  const fetchData = async() => {
    setIsLoading(true)
    const data = await getCountries()
    setIsLoading(false)
    return data?.data
  }

  useEffect(() => {
    fetchData().then((data) => {
      setData(data)
    })
  }, [])

  return (
    <Autocomplete
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
          { ...rest }
          label={ isLoading ? `Loading ${name} data...` : name }
        />
      )}
    />
  );
};

export default SelectCountries;
