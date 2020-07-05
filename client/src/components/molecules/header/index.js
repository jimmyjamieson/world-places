import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';
import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  appBarOpen: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: 0,
    },
  },
  appBarHidden: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: 240,
    },
  },
  menuButtonOpen: {

  },
  menuButtonHidden: {

  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ open, toggleDrawer }) => {
  const classes = useStyles();
  return (
    <AppBar position="absolute" className={clsx(classes.appBarOpen, open && classes.appBarHidden)}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          className={clsx(classes.menuButtonOpen, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          World Places
        </Typography>
        <a target="_blank" href="https://github.com/jimmyjamieson/world-places">
          <GitHubIcon />
        </a>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
