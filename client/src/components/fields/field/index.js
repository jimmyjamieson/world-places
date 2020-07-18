import React from 'react';
import TextField from '@material-ui/core/TextField';
import AutoCompleteCountries from '../auto-complete-countries';
import AutoCompleteRegions from '../auto-complete-regions';
import AutoCompleteLanguages from '../auto-complete-languages';
import AutoCompleteCurrencies from '../auto-complete-currencies';

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
      case 'regionSelect':
        return (
          <AutoCompleteRegions
            layoutProps={layoutProps}
            {...rest}
          />
        );
      case 'languageSelect':
        return (
          <AutoCompleteLanguages
            layoutProps={layoutProps}
            {...rest}
          />
        );
      case 'currencySelect':
        return (
          <AutoCompleteCurrencies
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
