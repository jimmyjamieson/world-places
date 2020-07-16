import React, { memo } from 'react';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import TableError from './table-error';

const TableRow = memo(({ item, handleDelete, handleUpdate, openForm, config }) => {
  const { columns } = config
  if (!item || !config) return <TableError>No item or config</TableError>

  console.log('item', item)

  return (
    <TableRow key={item.id}>
      {columns.forEach(col => <TableCell align="right">{item[col.value]}</TableCell>)}
      <TableCell align="right">
        <IconButton onClick={() => handleDelete(item.id)}>
          <DeleteForever />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

export default TableRow;
