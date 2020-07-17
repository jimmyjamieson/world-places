import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles({
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  icon: {

  }
});

const TableHeaderSortIcon = memo(({ direction }) => {
  const classes = useStyles();

  function showIconDirection() {
    if (direction === 'ASC') {
      return <ArrowDropDownIcon className={classes.icon} fontSize="small" />
    } else {
      return <ArrowDropUpIcon className={classes.icon} fontSize="small" />
    }
  }

  return (
    <div className={classes.iconWrapper}>
      { showIconDirection() }
    </div>
  )
});

export default TableHeaderSortIcon;
