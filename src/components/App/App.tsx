import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignInPage from './../SignInPage';
import SignUpPage from './../SignUpPage';
import Stopwatch from './../Stopwatch';
import ReportPage from './../ReportPage';
import Message from './../Message';

import Container from '@material-ui/core/Container';

import store from './../../lib/redux/store';
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
    <Provider store={store}>
      <Container maxWidth="sm">
        <Switch>
          <Route path="/report">
            <ReportPage />
          </Route>
          <Route path="/sign-up">
            <SignUpPage />
          </Route>
          <Route path="/sign-in">
            <SignInPage />
          </Route>
          <Route path="/">
            <Stopwatch />
          </Route>
        </Switch>
      </Container>
    </Provider>
    </Router>
  );
}

export default App;
