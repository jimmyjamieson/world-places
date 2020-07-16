import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import TableError from './table-error';
import TableRow from '@material-ui/core/TableRow';

const TableItemRow = ({
  row,
  data,
  handleDelete,
  handleUpdate,
  openForm,
  columns,
}) => {
  if (!row) return <TableError>No item or config</TableError>;

  return (
    <TableRow key={row.id}>
      {columns.map(col => {
        console.log('col', col, 'row', row)
        return <TableCell key={col.name}>{row[col.value]}</TableCell>;
      })}
      <TableCell align="right">
        <IconButton onClick={() => handleDelete(row.id)}>
          <DeleteForever />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TableItemRow;
