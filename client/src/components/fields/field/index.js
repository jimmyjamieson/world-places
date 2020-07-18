import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import AutoCompleteCountries from '../auto-complete-countries';

const layoutProps = {
  variant: 'outlined',
  fullWidth: true,
};

const Field = ({
  onChange,
  name,
  label,
  error,
  helperText,
  rules,
  key,
  type,
  defaultValueProp,
  ...rest
}) => {
  function renderFieldType(type) {
    switch (type) {
      case 'country':
        return (
          <AutoCompleteCountries
            layoutProps={layoutProps}
            name={name}
            label={label}
            error={error}
            helperText={helperText}
            rules={rules}
            key={key}
            defaultValue={defaultValueProp}
            onChange={onChange}
            {...rest}
          />
        );
      default:
        return (
          <TextField
            {...layoutProps}
            name={name}
            label={label}
            error={error}
            helperText={helperText}
            rules={rules}
            key={key}
            defaultValue={defaultValueProp}
            onChange={onChange}
            {...rest}
          />
        );
    }
  }

  return renderFieldType(type);
};

export default Field;
