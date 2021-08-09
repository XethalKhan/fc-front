import React, { useEffect } from 'react';
import './Stopwatch.css';

import Top from './../Top';
import Clock from './../Clock';
import CurrentTime from './../CurrentTime';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import type { RootState } from './../../lib/redux/store';

import { useAppSelector, useAppDispatch } from './../../lib/redux/hooks';
import { startAttemptThunk, endAttemptThunk, activeAttemptThunk, incrementAction, totalSetupAction } from './../../lib/redux/session';

import { useHistory, Link } from "react-router-dom";

import {filterSession} from './../../lib/api/session';

function Stopwatch() {

  const dispatch = useAppDispatch();

  const isActive = useAppSelector((state) => state.session.active);
  const milisec = useAppSelector((state) => state.session.milisec);
  const total = useAppSelector((state) => state.session.total);

  const isLogedIn = useAppSelector((state) => state.user.access);
  const token = useAppSelector((state) => state.user.token);

  const history = useHistory();

  useEffect(() => {

    if(!isLogedIn){
      history.push('/sign-in');
    }

  }, [isLogedIn]);

  useEffect(() => {

    if(isActive){
      setTimeout(() => { dispatch(incrementAction()); }, 500);
    }else{
      totalTimeSpentToday(token).then(result => dispatch(totalSetupAction(result))).catch(e => console.log(e));
    }

  }, [milisec]);

  useEffect(() => {

    if(isActive){
      (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(activeAttemptThunk());
    }

  }, [isActive]);


  if(!isLogedIn){
    return(null);
  }

  let h: number = 0;
  let m: number = 0;
  let clockButton;

  if(isActive){
    h = Math.floor(milisec / 3600000);
    m = Math.floor(milisec / 60000);
    clockButton = (<Button style={{
        width: "100%",
        backgroundColor: "red",
        color: "white"
      }}
      onClick={() => { (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(endAttemptThunk()); }}>
        <b>CLOCK OUT</b>
      </Button>);
  }else{
    h = Math.floor(total / 60);
    m = total % 60;
    clockButton = <Button style={{
        width: "100%",
        backgroundColor: "#06c383",
        color: "white"
      }}
      onClick={() => { (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(startAttemptThunk()); }}>
        <b>CLOCK IN</b>
      </Button>;
  }

  return(
    <Grid container>
      <Grid item xs={12}>
        <Top />
      </Grid>
      <Grid item xs={12}>
        <CurrentTime/>
      </Grid>
      <Grid item xs={12} id="title">
        <br/><br/>
        {isActive ? "TIME SPENT TODAY: " + (minutesToHouresFormated(total + Math.floor(milisec / 60000))).toString() : "TOTAL TIME SPENT TODAY"}
        <br/>
      </Grid>
      <Grid item xs={12}>
        <br/><br/>
        <Clock hours={h} minutes={m}/>
        <br/><br/>
      </Grid>
      <Grid item xs={12} className="button-container">
          <Link to="/report" style={{ textDecoration: 'none' }}>
            <Button style={{
              width: "100%",
              backgroundColor: "#A1A1A1",
              color: "white"
            }}>
            <b>REPORTS</b>
          </Button>
          </Link>
      </Grid>
      <Grid item xs={12} className="button-container">
          {clockButton}
      </Grid>
    </Grid>
  )

}

export default Stopwatch;

async function totalTimeSpentToday(token: string): Promise<number>{

  let dateObj = new Date();

  return filterSession(token, {date: dateObj})
  .then(response => response.json())
  .then(data => {
    let result = 0;

    for(let i = 0; i < data.length; i++){
      let start = new Date(data[i].start);
      let end = data[i].end === null ? start : new Date(data[i].end);

      let difference = Math.floor((end.getTime() - start.getTime()) / 60000);

      result += difference;
    }

    return result;

  });

}

function minutesToHouresFormated(minutes: number): string{
  let h = Math.floor(minutes / 60);
  let m = minutes % 60;

  let result: string = (h < 10 ? "0" + h.toString() : h.toString()) + "h";
  result += " ";
  result += (m < 10 ? "0" + m.toString() : m.toString()) + "m";

  return result;
}
