import React from 'react';
import TextField from '@material-ui/core/TextField';
import AutoCompleteCountries from '../auto-complete-countries';

const layoutProps = {
  variant: 'outlined',
  fullWidth: true,
};

const Field = ({ type, key, defaultValueProp, ...rest }) => {
  console.log('props', rest.name, defaultValueProp);

  function renderFieldType() {
    switch (type) {
      case 'countrySelect':
        return (
          <AutoCompleteCountries
            layoutProps={layoutProps}
            {...rest}
            defaultValueProp={defaultValueProp}
          />
        );
      default:
        return (
          <TextField
            {...layoutProps}
            {...rest}
            defaultValue={defaultValueProp}
          />
        );
    }
  }

  return renderFieldType();
};

export default Field;
