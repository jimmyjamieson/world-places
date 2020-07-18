import React, { memo, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormModal from '../../molecules/form-modal';
import validations from '../../../utils/form-validation';
import Box from '@material-ui/core/Box';
import AutoCompleteCountries from '../../fields/auto-complete-countries';
import Field from '../../fields/field';

const RegionForm = memo(
  ({
    name,
    id,
    open,
    handleClose,
    handleCreate,
    handleUpdate,
    handleGetItem,
  }) => {
    const { handleSubmit, control, errors, register, required, reset } = useForm();
    const [formData, setFormData] = useState();
    const isEditing = !!id;
    const formName = isEditing
      ? `Editing ${name} ${formData?.name}`
      : `Add a ${name}`;

    useEffect(() => {
      let mounted = true;

      (async () => {
        try {
          const data = await handleGetItem(id);
          if(mounted) {
            setFormData(data?.data);
          }
        } catch (e) {
          console.error(e);
        }
      })();

      return () => {
        mounted = false
      };
    }, []);

    const onSubmit = async values => {
      console.log('saveUpdateValues', values);
      if (isEditing) {
        await handleUpdate(values);
      } else {
        await handleCreate(values);
      }
      return handleClose();
    };

    return (
      <FormModal name={formName} open={open} onClose={handleClose}>
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
            <Box p={1}>
              <Controller
                as={Field}
                name="name"
                label="name"
                control={control}
                error={!!errors.name}
                defaultValueProp={formData?.name}
                key={formData?.name}
                helperText={
                  errors.name
                    ? errors.name.message
                    : 'The plain text name of the region'
                }
                rules={{
                  required: 'Required',
                }}
              />
            </Box>
            <Box p={1}>
              <Controller
                as={Field}
                name="nativeName"
                label="nativeName"
                control={control}
                error={!!errors.nativeName}
                defaultValueProp={formData?.nativeName}
                key={formData?.nativeName}
                helperText={
                  errors.nativeName
                    ? errors.nativeName.message
                    : 'The native name including speacial characters'
                }
                rules={{
                  required: 'Required',
                }}
              />
            </Box>
            <Box p={1}>
              <Controller
                as={Field}
                name="code"
                label="code"
                control={control}
                error={!!errors.code}
                helperText={
                  errors.code ? errors.code.message : 'Region code in format AB'
                }
                defaultValueProp={formData?.code}
                key={formData?.code}
                rules={{
                  required: 'Required',
                }}
              />
            </Box>
            <Box p={1}>
              {console.log('formData.country', formData?.country)}
              <Controller
                as={Field}
                type="country"
                name="country"
                label="country"
                control={control}
                error={!!errors.country}
                helperText={
                  errors.country
                    ? errors.country.message
                    : 'Select a country this region belongs to'
                }
                defaultValueProp={formData?.country}
                key={formData?.country}
                rules={{
                  required: 'Required',
                }}
              />
            </Box>
            <Box p={1}>
              <Controller
                as={TextField}
                name="coords"
                label="coords"
                variant="outlined"
                fullWidth
                control={control}
                error={!!errors.coords}
                helperText={
                  errors.coords
                    ? errors.coords.message
                    : 'Must be in the format 0.000,0.000'
                }
                defaultValue={formData?.coords}
                key={formData?.coords}
                rules={{
                  required: 'Required',
                  pattern: {
                    value: new RegExp(validations.coords),
                    message: 'Not a valid coords',
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              {isEditing ? 'Save' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </FormModal>
    );
  },
);

export default RegionForm;
