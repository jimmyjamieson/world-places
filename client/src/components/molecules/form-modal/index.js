import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
}));

const FormModal = ({ open, children, name, onClose }) => {
  const classes = useStyles();
  return (
    <Dialog open={open} fullWidth>
      <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">{name}</Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
};

export default FormModal;
