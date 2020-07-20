import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import CountriesPage from './pages/countries';
import RegionsPage from './pages/regions';
import CitiesPage from './pages/cities';
import LanguagesPage from './pages/languages';
import CurrenciesPage from './pages/currencies';
import Layout from './components/layout';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <HomePage />
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
      </Layout>
    </Router>
  );
}
export default App;
