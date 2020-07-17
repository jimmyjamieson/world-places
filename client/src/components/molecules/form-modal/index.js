import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const FormModal = ({ open, children, name, close }) => {
  return (
    <Dialog open={open}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">{name}</Typography>
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
      { children }
    </Dialog>
  );
};

export default FormModal;
