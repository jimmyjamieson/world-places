import React, { Fragment } from 'react'
import logo from './../../logo.svg';

const HomePage = () => {
  return (
    <Fragment>
      <img src={logo} className="Home-logo" />
      <p>
        Welcome to World Places. A Open Source and human edited resource of all countries, region/states, cities/towns across the world.
        You can update the information any time by cloning <a href="https://github.com/jimmyjamieson/world-places">https://github.com/jimmyjamieson/world-places</a> - making updates into the local data, re-exporting the json, and creating a pull request.
      </p>
      <p>
        You can access the api on <a href="http://localhost:4000/api">http://localhost:4000/api</a> and the docs on <a href="http://localhost:4000/docs">http://localhost:4000/docs</a>
      </p>
    </Fragment>
  )
}

export default HomePage