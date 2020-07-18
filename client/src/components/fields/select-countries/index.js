import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getCountries } from '../../../utils/api';
import CircularProgress from '@material-ui/core/CircularProgress';

const SelectCountries = ({ onChange, name, ...rest }) => {
  const [options, setOptions] = useState([]);

  const isLoading = options.length === 0;

  useEffect(() => {
    let active = true;

    if (!isLoading) {
      return undefined;
    }

    (async () => {
      const getData = await getCountries();
      const data = await getData?.data;

      if (active) {
        setOptions(data);
      }
    })();
  }, []);

  return (
    <Autocomplete
      options={options}
      loading={isLoading}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      getOptionLabel={option => option.name}
      getOptionSelected={(option, value) => option.name === value.id}
      renderInput={params => (
        <TextField
          {...params}
          {...rest}
          label={name}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default SelectCountries;
