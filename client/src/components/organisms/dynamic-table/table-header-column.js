import React, { memo } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHeaderSortIcon from './table-header-sort-icon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  innerTableCell: {
    display: 'flex',
    alignItems: 'center'
  },
  innerTableCellSelected: {
    color: theme.palette.primary.main
  }
}));

const TableHeaderColumn = memo(({ align, children, order, setOrder, columnKey }) => {
  const classes = useStyles();
  const name = order.split(',')[0]
  const direction = order.split(',')[1]
  const isActiveOrder = name === columnKey
  return (
    <TableCell align={align} onClick={setOrder}>
      <div className={clsx(classes.innerTableCell, isActiveOrder && classes.innerTableCellSelected)}>
        {children} { isActiveOrder && <TableHeaderSortIcon direction={ direction } />}
      </div>
    </TableCell>
  );
});

export default TableHeaderColumn;
