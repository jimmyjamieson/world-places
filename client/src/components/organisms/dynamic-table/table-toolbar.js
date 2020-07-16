import React from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const TableToolbar = () => {
  const classes = useStyles();
  return(
    <Toolbar variant="regular" className={classes.toolbar}>
      <Typography variant="h6" id="tableTitle" component="div">
        Countries
      </Typography>
      <TextField label="Search" />
    </Toolbar>
  )
}

export default TableToolbar