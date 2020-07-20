import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    zIndex: 10,
  },
});

const Footer = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <Box display="flex" alignItems="center">
        <Button variant="contained" color="primary">Import</Button>
      </Box>
    </BottomNavigation>
  );
}
export default Footer