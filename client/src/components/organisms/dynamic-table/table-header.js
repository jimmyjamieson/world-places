import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

const TableHeader = (config) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell component="th">ID</TableCell>
        <TableCell component="th">CODE</TableCell>
        <TableCell component="th">NAME</TableCell>
        <TableCell component="th">NATIVE</TableCell>
        <TableCell component="th">CONTINENT</TableCell>
        <TableCell component="th" align="right">
          COORDS
        </TableCell>
        <TableCell align="right">DELETE</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader