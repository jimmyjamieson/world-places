import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  return(
    <AppBar>
      <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        World Places
      </Typography>
      <Toolbar>
        <NavLink to="/"><Button color="inherit">Home</Button></NavLink>
        <NavLink to="/continents"><Button color="inherit">Continents</Button></NavLink>
        <NavLink to="/countries"><Button color="inherit">Countries</Button></NavLink>
        <NavLink to="/regions"><Button color="inherit">Regions</Button></NavLink>
        <NavLink to="/cities"><Button color="inherit">Cities</Button></NavLink>
        <NavLink to="/languages"><Button color="inherit">Languages</Button></NavLink>
        <NavLink to="/currencies"><Button color="inherit">Currencies</Button></NavLink>
      </Toolbar>
    </AppBar>
  )
}

export default Header