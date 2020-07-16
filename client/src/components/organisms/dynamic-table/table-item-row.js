import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import TableError from './table-error';
import TableRow from '@material-ui/core/TableRow';

const TableItemRow = ({
  item,
  handleDelete,
  handleUpdate,
  openForm,
  columns,
}) => {
  if (!item) return <TableError>No item or config</TableError>;

  const createTableCells = () => {
    const cells = columns.map(col => {
      return item[col.key];
    });
    cells.map(cell => {
      console.log(cell);
      return <TableCell>{cell}</TableCell>;
    });
  };

  return (
    <TableRow key={item.id}>
      {createTableCells()}
      <TableCell align="right">
        <IconButton onClick={() => handleDelete(item.id)}>
          <DeleteForever />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TableItemRow;
