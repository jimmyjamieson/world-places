import React from 'react';
import { getCurrencies } from '../../../utils/api';
import AutoComplete from '../auto-complete';

const AutoCompleteCurrencies = ({ ...rest }) => {
  return <AutoComplete fetchData={getCurrencies} {...rest} />;
};

export default AutoCompleteCurrencies;
