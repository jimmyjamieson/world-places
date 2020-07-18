import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getCountries } from '../../../utils/api';
import CircularProgress from '@material-ui/core/CircularProgress';

const SelectCountries = ({
  onChange,
  name,
  label,
  variant,
  fullWidth,
  error,
  defaultValue,
  key,
  helperText,
  rules,
}) => {
  console.log('SelectCountriesDefaultValue', name, defaultValue);

  const [options, setOptions] = useState([]);
  const isLoading = options.length === 0;

  useEffect(() => {
    let mounted = true;

    if (!isLoading) {
      return undefined;
    }

    (async () => {
      try {
        const getData = await getCountries();
        const data = await getData?.data;
        if (mounted) {
          setOptions(data);
        }
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Autocomplete
      options={options}
      loading={isLoading}
      defaultValue={defaultValue}
      getOptionLabel={option => option.name}
      key={key}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          name={name}
          label={label}
          variant={variant}
          fullWidth={fullWidth}
          error={error}
          helperText={helperText}
          rules={rules}
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
