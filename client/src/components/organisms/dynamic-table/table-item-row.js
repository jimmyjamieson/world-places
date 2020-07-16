import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import TableError from './table-error';
import TableRow from '@material-ui/core/TableRow';

const TableItemRow = ({ item, handleDelete, handleUpdate, openForm, columns }) => {
  if (!item) return <TableError>No item or config</TableError>

  return (
    <TableRow key={item.id}>
      <TableCell>{item.name}</TableCell>
      <TableCell align="right">
        <IconButton onClick={() => handleDelete(item.id)}>
          <DeleteForever />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TableItemRow;
