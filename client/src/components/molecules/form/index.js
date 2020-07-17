import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

const Form = ({ children, ...rest}) => {
  const classes = useStyles();
  return(
    <form {...rest} className={classes.root}>{children}</form>
  )
}
export default Form