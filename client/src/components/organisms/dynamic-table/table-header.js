import React, { memo } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

const TableHeader = memo(({ config = {} }) => {
  const { columns } = config;
  return (
    <TableHead>
      <TableRow>
        {columns && columns.map(col => (
          <TableCell align={col.align || 'left'}>{col.key.toUpperCase()}</TableCell>
        ))}
        <TableCell align="right">DELETE</TableCell>
        <TableCell align="right">EDIT</TableCell>
      </TableRow>
    </TableHead>
  );
});

export default TableHeader;
