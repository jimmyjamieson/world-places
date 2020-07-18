import React, { memo } from 'react';
import { getCountry, getRegion, updateCountry, updateRegion } from '../../../utils/api';
import DyanmicForm from '../../organisms/dynamic-form';

const config = {
  name: 'Country',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      helperText: 'The plain text name of the region',
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
      name: 'code',
      label: 'Code',
      type: 'text',
      helperText: 'Region code in format AB',
      validation: null,
    },
    {
      name: 'language',
      label: 'Language',
      type: 'languageSelect',
      helperText: 'Select the language of this country',
      validation: null,
    },
    {
      name: 'currency',
      label: 'Currency',
      type: 'currencySelect',
      helperText: 'Select the currency of this country',
      validation: null
    },
  ],
};

const CountryForm = memo(({ open, close, id, onSuccess }) => {
  return (
    <DyanmicForm
      id={id}
      fetchDataItem={getCountry}
      updateDataItem={updateCountry}
      onSuccess={onSuccess}
      open={open}
      close={close}
      config={config}
    />
  );
});

export default CountryForm;
