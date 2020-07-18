import React, { memo } from 'react';
import { createCountry, getCountry, getRegion, updateCountry, updateRegion } from '../../../utils/api';
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
    {
      name: 'coords',
      label: 'Coords',
      type: 'text',
      helperText: 'Must be in the format 0.000,0.000',
      validation: 'coords',
    },
  ],
};

const CountryForm = memo(({ open, close, id, onSuccess }) => {
  return (
    <DyanmicForm
      id={id}
      fetchDataItem={getCountry}
      createDataItem={createCountry}
      updateDataItem={updateCountry}
      onSuccess={onSuccess}
      open={open}
      close={close}
      config={config}
    />
  );
});

export default CountryForm;
