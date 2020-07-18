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
  fetchDataItem,
  updateDataItem,
  createDataItem,
  onSuccess,
  config,
}) => {
  const classes = useStyles();
  const { handleSubmit, control, errors, register, required } = useForm();
  const {name } = config
  const [formData, setFormData] = useState();
  const isEditing = !!id;
  const formTitle = isEditing
    ? `Editing ${name} ${formData?.name}`
    : `Add a ${name}`;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchDataItem(id);
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
      await updateDataItem(values);
    } else {
      await createDataItem(values);
    }
    return onSuccess()
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
              error={!!errors[field.name]}
              defaultValue={formData && formData[field.name]}
              defaultValueProp={formData && formData[field.name]}
              key={formData && formData[field.name]}
              helperText={errors.name ? errors.name.message : field.helperText}
              rules={{
                required: 'Required',
                pattern: {
                  value: new RegExp(validations[field?.validation?.pattern]),
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
        <DialogContent>
          {isEditing && (
            <input
              name="id"
              type="hidden"
              ref={register({ required })}
              defaultValue={formData?.id}
            />
          )}
          {renderFields()}
        </DialogContent>
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
