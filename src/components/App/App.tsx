import React from 'react';
import logo from './logo.svg';
import './App.css';
import Stopwatch from './../Stopwatch';

import Container from '@material-ui/core/Container';

function App() {
  return (
    <Container maxWidth="sm">
      <Stopwatch />
    </Container>
  );
}

export default App;
