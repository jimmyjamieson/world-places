import React from 'react';
import Alert from '@material-ui/lab/Alert';

const TableError = ({ children }) => {
  return <Alert severity="error">{children}</Alert>;
};

export default TableError;
