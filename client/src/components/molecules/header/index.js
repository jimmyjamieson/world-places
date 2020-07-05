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
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ open, handleDrawerOpen }) => {
  const classes = useStyles();
  return (
    <AppBar position="absolute">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
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
