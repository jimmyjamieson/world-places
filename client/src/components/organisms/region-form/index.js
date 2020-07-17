import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormModal from '../../molecules/form-modal';
import validations from '../../../utils/form-validation';

const RegionForm = ({
  mode = 'add',
  name = 'Dialog',
  handleAdd,
  handleUpdate,
}) => {
  const { handleSubmit, control, errors, register } = useForm();
  const onSubmit = values => console.log(values);

  return (
    <FormModal mode={mode} name={name} open={true}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            as={TextField}
            name="name"
            label="name"
            variant="outlined"
            control={ control }
            error={errors.name}
            helperText={errors.name && errors.name.message}
            rules={{
              required: 'Required',
              pattern: {
                value: new RegExp(validations.email),
                message: 'Not an email',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </FormModal>
  );
};

export default RegionForm;
