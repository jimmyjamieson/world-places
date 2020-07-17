import React from 'react';
import { useForm } from 'react-hook-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormModal from '../../molecules/form-modal';

const RegionForm = ({ mode = 'add', name = 'Dialog', handleAdd, handleUpdate }) => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => console.log(values);

  return (
    <FormModal mode={ mode } name={name} open={true}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            name="email"
            label="email"
            variant="outlined"
            ref={register({
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
          />
          {errors.email && errors.email.message}

          <TextField
            name="username"
            label="email"
            variant="outlined"
            ref={register({
              validate: value => value !== 'admin' || 'Nice try!',
            })}
          />
          {errors.username && errors.username.message}
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
