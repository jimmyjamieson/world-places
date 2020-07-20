import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { isMobile } from '../../utils/is-mobile';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './header';
import Navigation from './navigation';
import Content from './content';
import Footer from './footer';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  }
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(!isMobile());
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return(
    <div className={classes.root}>
      <CssBaseline />
      <Header open={ open } toggleDrawer={ toggleDrawer } />
      <Navigation open={ open } handleDrawerClose={ handleDrawerClose } />
      <Content>
        { children }
      </Content>
      <Footer />
    </div>
  )

}

export default Layout