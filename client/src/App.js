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
          <Route exact path="/" component={HomePage} />
          <Route exact path="/countries" component={CountriesPage} />
          <Route exact path="/regions" component={RegionsPage} />
          <Route exact path="/regions/country/:id" component={RegionsPage} />
          <Route exact path="/cities" component={CitiesPage} />
          <Route exact path="/cities/country/:id" component={CitiesPage} />
          <Route exact path="/cities/region/:id" component={CitiesPage} />
          <Route exact path="/languages" component={LanguagesPage} />
          <Route exact path="/currencies" component={CurrenciesPage} />
        </Switch>
      </Layout>
    </Router>
  );
}
export default App;
