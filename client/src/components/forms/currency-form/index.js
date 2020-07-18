import React, { memo } from 'react';
import {
  createCurrency,
  getCurrency,
  updateCurrency,
} from '../../../utils/api';
import DyanmicForm from '../../organisms/dynamic-form';

const config = {
  name: 'Language',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      helperText: 'The plain text name of the language',
      validation: null,
    },
    {
      name: 'nativeName',
      label: 'Native name',
      type: 'text',
      helperText: 'The native name including special characters',
      validation: null,
    },
    {
      name: 'symbol',
      label: 'Symbol',
      type: 'text',
      helperText: 'The currency symbol i.e &euro;',
      validation: null,
    },
    {
      name: 'code',
      label: 'Code',
      type: 'text',
      helperText: 'Currency code',
      validation: null,
    },
    {
      name: 'number',
      label: 'Number',
      type: 'number',
      helperText: 'The currency number',
      validation: null,
    },
    {
      name: 'decimals',
      label: 'Decimals',
      type: 'decimals',
      helperText: 'The currency decimal point',
      validation: null,
    },
  ],
};

const CurrencyForm = memo(({ open, close, id, onSuccess }) => {
  return (
    <DyanmicForm
      id={id}
      fetchDataItem={getCurrency}
      createDataItem={createCurrency}
      updateDataItem={updateCurrency}
      onSuccess={onSuccess}
      open={open}
      close={close}
      config={config}
    />
  );
});

export default CurrencyForm;
