import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import HomePage from './pages/home';
import ContinentsPage from './pages/continents';
import CountriesPage from './pages/countries';
import RegionsPage from './pages/regions';
import CitiesPage from './pages/cities';
import LanguagesPage from './pages/languages';
import CurrenciesPage from './pages/currencies';
import Header from './components/molecules/header';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <Header />
        <article className="App-content">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/continents">
              <ContinentsPage />
            </Route>
            <Route path="/countries">
              <CountriesPage />
            </Route>
            <Route path="/regions">
              <RegionsPage />
            </Route>
            <Route path="/cities">
              <CitiesPage />
            </Route>
            <Route path="/languages">
              <LanguagesPage />
            </Route>
            <Route path="/currencies">
              <CurrenciesPage />
            </Route>
          </Switch>
        </article>
        <footer className="App-footer">
          <button>EXPORT DATA TO JSON</button> <button>IMPORT JSON TO DATABASE</button>
        </footer>
      </div>
    </Router>
  );
}

export default App;
