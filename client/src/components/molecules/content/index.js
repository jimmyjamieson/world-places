import React from 'react';
import Container from '@material-ui/core/Container';

const Content = ({ children }) => {
  return (
    <Container maxWidth="lg">{ children }</Container>
  )
}

export default Content