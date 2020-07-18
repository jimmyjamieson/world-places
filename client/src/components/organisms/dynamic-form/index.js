import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Field from '../../fields/field';
import validations from '../../../utils/form-validation';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const defaultConfig = {
  name: 'Regions',
  altName: 'Region',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      helperText: 'The plain text name of the region',
      required: true,
      validation: null,
    },
    {
      name: 'nativeName',
      label: 'Native name',
      type: 'text',
      helperText: 'The native name including special characters',
      required: true,
      validation: null,
    },
    {
      name: 'code',
      label: 'Code',
      type: 'text',
      helperText: 'Region code in format AB',
      required: true,
      validation: null,
    },
    {
      name: 'country',
      label: 'Country',
      type: 'countrySelect',
      helperText: 'Select a country this region belongs to',
      required: true,
      validation: null,
    },
    {
      name: 'coords',
      label: 'Coords',
      type: 'text',
      helperText: 'Must be in the format 0.000,0.000',
      required: true,
      validation: 'coords',
    },
  ],
};

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const DyanmicForm = ({
  id,
  open,
  close,
  fetchData,
  updateData,
  createData,
  onSuccess,
  config = defaultConfig,
}) => {
  const classes = useStyles();
  const { handleSubmit, control, errors, register, required } = useForm();
  const [formData, setFormData] = useState();
  const isEditing = !!id;
  const formTitle = isEditing
    ? `Editing ${name} ${formData?.name}`
    : `Add a ${name}`;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchData(id);
        if (mounted) {
          setFormData(data?.data);
        }
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const onSubmit = async values => {
    if (isEditing) {
      await updateData(values);
    } else {
      await createData(values);
    }
    return close();
  };

  function renderFields() {
    const { fields = [] } = config;

    return (
      fields.length > 0 &&
      fields.map(field => {
        return (
          <Box p={1}>
            <Controller
              as={Field}
              type={field.type}
              name={field.name}
              label={field.label}
              control={control}
              error={!![field.name]}
              defaultValue={formData?.[field.name]}
              defaultValueProp={formData?.[field.name]}
              key={formData?.[field.name]}
              helperText={errors.name ? errors.name.message : field.helperText}
              rules={{
                required: 'Required',
                pattern: {
                  value: new RegExp(validations[field.validation.pattern]),
                  message: `Not a valid ${field.name}`,
                },
              }}
            />
          </Box>
        );
      })
    );
  }

  return (
    <Dialog open={open} fullWidth>
      <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">{formTitle}</Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>{renderFields()}</DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            {isEditing ? 'Save' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DyanmicForm;
