import React, { useEffect, useState } from 'react';
import MdAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const AutoComplete = ({
  fetchData,
  layoutProps,
  onChange,
  name,
  label,
  error,
  helperText,
  rules,
  key,
  defaultValueProp,
  ...rest
}) => {
  const [options, setOptions] = useState([]);
  const isLoading = options.length === 0;

  useEffect(() => {
    let mounted = true;

    if (!isLoading) {
      return undefined;
    }

    (async () => {
      try {
        const getData = await fetchData();
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
  }, [fetchData, isLoading]);

  return (
    <MdAutocomplete
      options={options}
      loading={isLoading}
      defaultValue={defaultValueProp}
      getOptionLabel={option => option.name || ''}
      key={key}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      { ...rest }
      renderInput={params => (
        <TextField
          name={name}
          label={label}
          error={error}
          helperText={helperText}
          rules={rules}
          {...params}
          {...layoutProps}
          { ...rest }
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

export default AutoComplete;
