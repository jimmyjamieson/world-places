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
                key={col.key}
                columnKey={col.key}
                align={col.align || 'left'}
                order={order}
                setOrder={setOrder}
              >
                {col.name.toUpperCase()}
              </TableHeaderColumn>
            );
          })}
        <TableCell align="right">EDIT</TableCell>
        <TableCell align="right">DELETE</TableCell>
      </TableRow>
    </TableHead>
  );
});

export default TableHeader;
