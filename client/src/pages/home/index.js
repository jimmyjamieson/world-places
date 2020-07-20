import React, { Fragment } from 'react';
import logo from './../../logo.svg';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ImportExportButtons from '../../components/organisms/import-export-buttons';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const HomePage = () => {
  return (
    <Fragment>
      <Card>
        <CardActionArea>
          <CardMedia image={logo} />
          <CardContent>
            <Typography variant="h2">
              Welcome to World Places
            </Typography>
            <Typography variant="body1" paragraph>
              A Open Source and human edited resource
              of all countries, region/states, cities/towns across the world.
            </Typography>
            <Typography variant="h3">
              Get started
            </Typography>
            <Typography paragraph>
              To get started. Make sure you have <a href="https://docs.docker.com/get-docker/" target="_blank">Docker</a> and <a href="https://nodejs.org/" target="_blank">Nodejs</a>  installed.
            </Typography>
            <List>
              <Divider />
              <ListItem>
                Clone repo and inside the project directory run "npm install"
              </ListItem>
              <Divider />
              <ListItem>
                Run "docker-compose up -d" - This give you a db for creating and managing data.
              </ListItem>
              <Divider />
              <ListItem>
                On localhost:3000 - Click the import button to populate the database and make any fixes, additions or changes.
              </ListItem>
              <Divider />
              <ListItem>
                Once you're done click EXPORT and create a pull request. Your updates will be merged with the main branch for others.
              </ListItem>
              <Divider />
              <ListItem>
                You can access your modified data as JSON from the data folder. Or once merged, raw from the directory on  <a
                href="https://github.com/jimmyjamieson/world-places/tree/master/data"
                target="_blank"
              >
                GitHub
              </a>
              </ListItem>
              <Divider />
            </List>
            <ImportExportButtons />
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
