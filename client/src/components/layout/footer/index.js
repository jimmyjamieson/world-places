import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import ImportButton from '../../organisms/import-button';
import ExportButton from '../../organisms/export-button';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    zIndex: 10,
    paddingLeft: '20px',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
  },
  bottomDrawerOpen: {
    paddingLeft: '260px',
  },
  buttons: {
    marginRight: '1.5rem',
    minWidth: '100px',
  },
}));

const Footer = ({ open }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      justifyContent="start"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      classes={{
        root: clsx(classes.root, open && classes.bottomDrawerOpen),
      }}
    >
      <Box display="flex" alignItems="center">
        <ImportButton className={classes.buttons} />
        <ExportButton className={classes.buttons} />
      </Box>
    </BottomNavigation>
  );
};
export default Footer;
