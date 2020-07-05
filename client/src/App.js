import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomePage from './pages/home';
import ContinentsPage from './pages/continents';
import CountriesPage from './pages/countries';
import RegionsPage from './pages/regions';
import CitiesPage from './pages/cities';
import LanguagesPage from './pages/languages';
import CurrenciesPage from './pages/currencies';
import Header from './components/molecules/header';
import Navigation from './components/molecules/navigation';
import Content from './components/molecules/content';
import Footer from './components/molecules/footer';
import { isMobile } from './utils/is-mobile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(!isMobile());
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const toggleDrawer = () => {
    setOpen(!open)
  }
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Header open={ open } toggleDrawer={ toggleDrawer } />
        <Navigation open={ open } handleDrawerClose={ handleDrawerClose } />
        <Content>
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
        </Content>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
