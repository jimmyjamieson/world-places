import React, { memo } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const TableToolbar = memo(({ name = 'Listing', setSearchQuery }) => {
  const classes = useStyles();

  const transformSearchQuery = event => {
    const target = event?.target;

    const transformSearch = {
      $or: [
        {
          name: {
            $contL: target?.value,
          },
        },
        {
          nativeName: {
            $contL: target?.value,
          },
        },
        {
          code: {
            $contL: target?.value,
          },
        },
      ],
    };

    setSearchQuery(transformSearch);
  };

  return (
    <Toolbar variant="regular" className={classes.toolbar}>
      <Typography variant="h6" id="tableTitle" component="div">
        {name.toUpperCase()}
      </Typography>
      <TextField label="Search" onChange={transformSearchQuery} />
    </Toolbar>
  );
});

export default TableToolbar;
