import React, { memo } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableHeaderColumn from './table-header-column';

const TableHeader = memo(({ config = {}, order, setOrder }) => {
  const { columns } = config;
  return (
    <TableHead>
      <TableRow>
        {columns &&
          columns.map(col => {
            return (
              <TableHeaderColumn
                columnKey={col.key}
                align={col.align || 'left'}
                order={order}
                setOrder={setOrder}
              >
                {col.key.toUpperCase()}
              </TableHeaderColumn>
            );
          })}
        <TableCell align="right">DELETE</TableCell>
        <TableCell align="right">EDIT</TableCell>
      </TableRow>
    </TableHead>
  );
});

export default TableHeader;
