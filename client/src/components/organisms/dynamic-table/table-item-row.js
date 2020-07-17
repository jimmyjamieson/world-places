import React, { memo } from 'react';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import TableError from './table-error';
import TableRow from '@material-ui/core/TableRow';

const TableItemRow = memo(({
  row,
  handleDelete,
  openForm,
  columns,
}) => {

  const renderTableCells = () => {
    return columns.map(col => {
      console.log(row[col.value])
      return <TableCell key={col.id}>{row[col.value]}</TableCell>;
    })
  }

  return (
    <TableRow key={row.id}>
      { renderTableCells() }
      <TableCell align="right">
        <IconButton onClick={() => openForm('edit', row.id)}>
          <Edit fontSize="small" />
        </IconButton>
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={() => handleDelete(row.id)}>
          <DeleteForever fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

export default TableItemRow;
