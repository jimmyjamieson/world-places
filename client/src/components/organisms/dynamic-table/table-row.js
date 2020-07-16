import React, { memo } from 'react';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';

const TableRow = memo(({ item, handleDelete, handleUpdate, openForm, config }) => {
  return (
    <TableRow key={item.id}>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.code}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.nativeName}</TableCell>
      <TableCell>{item?.continent?.name}</TableCell>
      <TableCell align="right">{item.coords}</TableCell>
      <TableCell align="right">
        <IconButton onClick={() => handleDelete(item.id)}>
          <DeleteForever />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

export default TableRow;
