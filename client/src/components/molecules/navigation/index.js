import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 320,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));


const Navigation = ({ open, handleDrawerClose }) => {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
      <Divider />
      <Button component={NavLink} to="/">
        Home
      </Button>
      <Button component={NavLink} to="/continents" color="inherit">
        Continents
      </Button>
      <Button component={NavLink} to="/countries" color="inherit">
        Countries
      </Button>
      <Button component={NavLink} to="/regions" color="inherit">
        Regions
      </Button>
      <Button component={NavLink} to="/cities" color="inherit">
        Cities
      </Button>
      <Button component={NavLink} to="/languages" color="inherit">
        Languages
      </Button>
      <Button component={NavLink} to="/currencies" color="inherit">
        Currencies
      </Button>
    </Drawer>
  )
}

export default Navigation