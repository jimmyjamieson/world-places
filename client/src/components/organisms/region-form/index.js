import React, { memo, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import FormModal from '../../molecules/form-modal';
import validations from '../../../utils/form-validation';
import Box from '@material-ui/core/Box';
import Field from '../../fields/field';
import DyanmicForm from '../dynamic-form';
import { getRegion, updateRegion } from '../../../utils/api';

const config = {
  name: 'Regions',
  altName: 'Region',
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
      updateDataItem={updateRegion}
      onSuccess={onSuccess}
      open={open}
      close={close}
      config={config}
    />
  );
});

export default RegionForm;
