import React, { memo } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

const TableHeader = memo(({ config = {} }) => {
  const { columns } = config;
  console.log('header-columns', columns)
  return (
    <TableHead>
      <TableRow>
        {columns && columns.map(col => (
          <TableCell align={col.align || 'left'}>{col.column.toUpperCase()}</TableCell>
        ))}
        <TableCell align="right">DELETE</TableCell>
      </TableRow>
    </TableHead>
  );
});

export default TableHeader;
