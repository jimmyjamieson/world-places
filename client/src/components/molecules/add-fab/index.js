import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: '2rem',
    right: '2rem'
  },
}));

const AddFab = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Fab className={classes.fab} color="secondary" aria-label="add" onClick={onClick}>
      <AddIcon />
    </Fab>
  )
}

export default AddFab