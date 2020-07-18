import React from 'react';
import { getRegions } from '../../../utils/api';
import AutoComplete from '../auto-complete';

const AutoCompleteRegions = ({ ...rest }) => {
  return <AutoComplete fetchData={getRegions} {...rest} />;
};

export default AutoCompleteRegions;
