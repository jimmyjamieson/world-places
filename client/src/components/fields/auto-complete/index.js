import React, { useEffect, useState } from 'react';
import MdAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const AutoComplete = ({
  fetchData,
  onChange,
  layoutProps,
  defaultValueProp,
  defaultValue,
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
      getOptionLabel={option => option?.name}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      renderInput={params => (
        <TextField
          defaultValue={defaultValue}
          {...params}
          {...layoutProps}
          {...rest}
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
