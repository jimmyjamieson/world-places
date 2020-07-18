import React, { memo } from 'react';
import { createRegion, getRegion, updateRegion } from '../../../utils/api';
import DyanmicForm from '../../organisms/dynamic-form';

const config = {
  name: 'Region',
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
      name: 'country',
      label: 'Country',
      type: 'countrySelect',
      helperText: 'Select a country this region belongs to',
      validation: null,
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

const RegionForm = memo(({ open, close, id, onSuccess }) => {
  return (
    <DyanmicForm
      id={id}
      fetchDataItem={getRegion}
      createDataItem={createRegion}
      updateDataItem={updateRegion}
      onSuccess={onSuccess}
      open={open}
      close={close}
      config={config}
    />
  );
});

export default RegionForm;
