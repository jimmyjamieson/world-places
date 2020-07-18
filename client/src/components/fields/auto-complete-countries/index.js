import React from 'react';
import { getCountries } from '../../../utils/api';
import AutoComplete from '../auto-complete';

const AutoCompleteCountries = ({
  onChange,
  name,
  label,
  layoutProps,
  error,
  defaultValueProp,
  key,
  helperText,
  rules,
  ...rest
}) => {
  return (
    <AutoComplete
      onChange={onChange}
      name={name}
      label={label}
      layoutProps={layoutProps}
      error={error}
      defaultValueProp={defaultValueProp}
      key={key}
      helperText={helperText}
      rules={rules}
      fetchData={getCountries}
      { ...rest }
    />
  );
};

export default AutoCompleteCountries;
