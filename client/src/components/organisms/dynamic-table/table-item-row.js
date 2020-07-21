import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import TableRow from '@material-ui/core/TableRow';
import get from 'lodash/get';

const renderLink = (id, name, link, currentPath) => {
  if (link) {
    return <Link to={`${currentPath}/${link}/${id}`}>{name}</Link>
  } else {
    return name
  }
}

const TableItemRow = memo(
  ({ row, handleDelete, handleOpenForm, columns, location }) => {
    const pathname = location?.pathname
    const renderTableCells = () => {
      return columns.map(col => {
        const linkId = get(row, col.linkId)
        const name = get(row, col.value);
        return (
          <TableCell align={col.align || 'left'} key={col.id}>
            {renderLink(linkId, name, col.link, pathname)}
          </TableCell>
        );
      });
    };

    return (
      <TableRow key={row.id}>
        {renderTableCells()}
        <TableCell align="right">
          <IconButton onClick={() => handleOpenForm(row.id)}>
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
  },
);

export default TableItemRow;
