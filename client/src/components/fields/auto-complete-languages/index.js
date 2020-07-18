import React from 'react';
import { getLanguages } from '../../../utils/api';
import AutoComplete from '../auto-complete';

const AutoCompleteLanguages = ({ ...rest }) => {
  return <AutoComplete fetchData={getLanguages} {...rest} />;
};

export default AutoCompleteLanguages;
