import React, { Fragment } from 'react';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
} from '@material-ui/core';
import logo from './../../logo.svg';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Fragment>
      <Card>
        <CardActionArea>
          <CardMedia image={logo} />
          <CardContent>
            <Typography variant="body1" gutterBottom>
              Welcome to World Places. A Open Source and human edited resource
              of all countries, region/states, cities/towns across the world.
              You can update the information any time by cloning the repo -
              making updates into the local data, re-exporting the json, and
              creating a pull request.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href="https://github.com/jimmyjamieson/world-places"
            >
              GitHub
            </Button>
            <Button
              variant="contained"
              color="secondary"
              target="_blank"
              href="http://localhost:4000/api"
            >
              API
            </Button>
            <Button
              variant="contained"
              color="secondary"
              target="_blank"
              href="http://localhost:4000/docs"
            >
              DOCS
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </Fragment>
  );
};

export default HomePage;
