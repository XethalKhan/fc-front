import React from 'react';
import logo from './logo.svg';
import './App.css';
import Stopwatch from './../StopwatchRedux';

import Container from '@material-ui/core/Container';

import store from './../../redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="sm">
        <Stopwatch />
      </Container>
    </Provider>
  );
}

export default App;
