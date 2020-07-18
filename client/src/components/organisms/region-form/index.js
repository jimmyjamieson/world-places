import React, { memo, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormModal from '../../molecules/form-modal';
import validations from '../../../utils/form-validation';
import Box from '@material-ui/core/Box';
import SelectCountries from '../../fields/select-countries';

const RegionForm = memo(
  ({
    mode,
    name,
    id,
    open,
    handleClose,
    handleCreate,
    handleUpdate,
    handleGetItem,
  }) => {
    const { handleSubmit, control, errors, register, required } = useForm();
    const [formData, setFormData] = useState();
    const isEditing = !!id;
    const formName = isEditing
      ? `Editing ${name} ${formData?.name}`
      : `Add a ${name}`;

    useEffect(() => {
      (async () => {
        const data = await handleGetItem(id);
        setFormData(data?.data);
      })();
    }, [isEditing]);

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
      <FormModal mode={mode} name={formName} open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {isEditing && (
              <input name="id" type="hidden" ref={register({ required })} defaultValue={formData?.id} />
            )}
            <Box p={1}>
              <Controller
                as={TextField}
                name="name"
                label="name"
                variant="outlined"
                fullWidth
                control={control}
                error={!!errors.name}
                defaultValue={formData?.name}
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
                as={TextField}
                name="nativeName"
                label="nativeName"
                variant="outlined"
                fullWidth
                control={control}
                error={!!errors.nativeName}
                defaultValue={formData?.nativeName}
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
                as={TextField}
                name="code"
                label="code"
                variant="outlined"
                fullWidth
                control={control}
                error={!!errors.code}
                helperText={
                  errors.code ? errors.code.message : 'Region code in format AB'
                }
                defaultValue={formData?.code}
                key={formData?.code}
                rules={{
                  required: 'Required',
                }}
              />
            </Box>
            <Box p={1}>
              { console.log('formData.country', formData?.country) }
              <Controller
                as={SelectCountries}
                name="country"
                label="country"
                variant="outlined"
                fullWidth
                control={control}
                error={!!errors.country}
                helperText={
                  errors.country
                    ? errors.country.message
                    : 'Select a country this region belongs to'
                }
                defaultValue={formData?.country}
                key={formData?.country?.id}
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
