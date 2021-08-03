import React, { useEffect } from 'react';
import './Stopwatch.css';

import Clock from './../Clock';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useAppSelector, useAppDispatch } from './../../redux/hooks';
import { start, end, increment, totalSetup } from './../../redux/sessionSlice'

function Stopwatch() {

  const dispatch = useAppDispatch();

  const isActive = useAppSelector((state) => state.session.active);
  let milisec = useAppSelector((state) => state.session.milisec);
  const total = useAppSelector((state) => state.session.total);

  useEffect(() => {

    if(isActive){
      setTimeout(() => { dispatch(increment()); }, 500);
    }else{
      totalTimeSpentToday().then(result => dispatch(totalSetup(result))).catch(e => console.log(e));
    }

  }, [isActive, milisec]);

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
      onClick={() => { dispatch(end()); }}>
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
      onClick={() => { dispatch(start()); }}>
        <b>CLOCK IN</b>
      </Button>;
  }

  return(
    <Grid container>
      <Grid item xs={12} id="title">
        <h1>
          {isActive ? "TIME SPENT TODAY: " + (minutesToHouresFormated(total + Math.floor(milisec / 60000))).toString() : "TOTAL TIME SPENT TODAY"}
        </h1>
        <br/><br/>
      </Grid>
      <Clock hours={h} minutes={m}/>
      <Grid item xs={12} className="button-container">
          <Button style={{
            width: "100%",
            backgroundColor: "#A1A1A1",
            color: "white"
          }}>
          <b>REPORTS</b>
          </Button>
      </Grid>
      <Grid item xs={12} className="button-container">
          {clockButton}
      </Grid>
      {isActive.toString()}<br/>
      {milisec}<br/>
      {minutesToHouresFormated(total)}
    </Grid>
  )

}

export default Stopwatch;

async function totalTimeSpentToday(): Promise<number>{

  let dateObj = new Date();

  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  let date = year + "-" + month + "-" + day;

  let url: string = "http://localhost:3000/session?date=" + date;

  return window.fetch(url, {
    method: "GET",
  })
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
