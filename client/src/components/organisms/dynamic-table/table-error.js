import React from 'react';
import Alert from '@material-ui/lab/Alert';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const TableError = ({ children, tableColumnCount, severity = 'error', style }) => {
  return (
    <TableRow>
      <TableCell colSpan={tableColumnCount}>
        <Alert severity={ severity }>{children}</Alert>
      </TableCell>
    </TableRow>
  );
};

export default TableError;
