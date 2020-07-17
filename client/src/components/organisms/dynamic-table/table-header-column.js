import React, { memo } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHeaderSortIcon from './table-header-sort-icon';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  innerTableCellSelected: {
    color: theme.palette.primary.main
  }
}));

const TableHeaderColumn = memo(({ align, children, order, setOrder, columnKey }) => {
  console.log('order', order)
  const classes = useStyles();
  const name = order.split(',')[0]
  const direction = order.split(',')[1]
  const isActiveOrder = name === columnKey

  function handleSetOrder() {

    const dir = direction === 'ASC' ? 'DESC' : 'ASC'
    const order = `${columnKey},${dir}`

    setOrder(order)
  }

  return (
    <TableCell align={align} onClick={handleSetOrder}>
      <Button className={clsx(isActiveOrder && classes.innerTableCellSelected)}>
        {children} { isActiveOrder && <TableHeaderSortIcon direction={ direction } />}
      </Button>
    </TableCell>
  );
});

export default TableHeaderColumn;
