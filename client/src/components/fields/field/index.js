import React from 'react';
import TextField from '@material-ui/core/TextField';
import AutoCompleteCountries from '../auto-complete-countries';

const layoutProps = {
  variant: 'outlined',
  fullWidth: true,
};

const Field = ({ type, key, ...rest }) => {

  function renderFieldType() {
    switch (type) {
      case 'countrySelect':
        return (
          <AutoCompleteCountries
            layoutProps={layoutProps}
            {...rest}
          />
        );
      default:
        return (
          <TextField
            {...layoutProps}
            {...rest}
          />
        );
    }
  }

  return renderFieldType();
};

export default Field;
