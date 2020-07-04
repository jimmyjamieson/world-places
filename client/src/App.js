import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import HomePage from './pages/home';
import ContinentsPage from './pages/continents';
import CountriesPage from './pages/countries';
import RegionsPage from './pages/regions';
import CitiesPage from './pages/cities';
import LanguagesPage from './pages/languages';
import CurrenciesPage from './pages/currencies';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">Home</Link>
          <Link to="/continents">Continents</Link>
          <Link to="/countries">Countries</Link>
          <Link to="/regions">Regions</Link>
          <Link to="/cities">Cities</Link>
          <Link to="/languages">Languages</Link>
          <Link to="/currencies">Currencies</Link>
        </header>
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
      </div>
    </Router>
  );
}

export default App;
