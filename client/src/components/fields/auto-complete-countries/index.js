import React from 'react';
import { getCountries } from '../../../utils/api';
import AutoComplete from '../auto-complete';

const AutoCompleteCountries = ({ ...rest }) => {
  return <AutoComplete fetchData={getCountries} {...rest} />;
};

export default AutoCompleteCountries;
