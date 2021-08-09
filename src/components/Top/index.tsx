import React, {useState, useEffect} from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import type { RootState } from './../../lib/redux/store';

import { useAppDispatch } from './../../lib/redux/hooks';
import { logoutAttemptThunk } from './../../lib/redux/user';

import {
  useLocation,
  Link
} from "react-router-dom";

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Top(){

  // (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(loginAttemptThunk(email, password));

  const dispatch = useAppDispatch();

  const location = useLocation();

  const back = <Link to="/"><ArrowBackIcon style={{
        width: "30px",
        height: "30px",
        color: "white",
        position: "relative",
        bottom: "-130px",
        left: "30px"}}/></Link>;

  return (<Grid container style={{backgroundColor: "#202630"}}>
    <Grid item xs={4}>
      {location.pathname == "/" ? "" : back}
    </Grid>
    <Grid item xs={4} style={{textAlign: "center"}}>
      <br/>
      <AccessAlarmIcon style={{
        color: "#06c383",
        width: "150px",
        height: "150px"
      }}/>
      <br/><br/>
    </Grid>
    <Grid item xs={4}>
      <Button
      style={{
        textDecoration: "underline",
            color: "white",
            position: "relative",
            bottom: "-130px",
            right: "-60px"}}
      onClick ={() => {
        (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(logoutAttemptThunk());
      }}>SIGN OUT</Button>
    </Grid>
  </Grid>);

}

export default Top;
