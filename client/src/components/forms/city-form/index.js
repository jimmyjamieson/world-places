import React, { memo } from 'react';
import {
  createCity,
  getCity,
  updateCity,
} from '../../../utils/api';
import DyanmicForm from '../../organisms/dynamic-form';

const config = {
  name: 'City',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      helperText: 'The plain text name of the town/city',
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
      helperText: 'City code',
      validation: null,
    },
    {
      name: 'region',
      label: 'Region',
      type: 'regionSelect',
      helperText: 'Select the region of this town/city',
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

const CityForm = memo(({ open, close, id, onSuccess }) => {
  return (
    <DyanmicForm
      id={id}
      fetchDataItem={getCity}
      createDataItem={createCity}
      updateDataItem={updateCity}
      onSuccess={onSuccess}
      open={open}
      close={close}
      config={config}
    />
  );
});

export default CityForm;
