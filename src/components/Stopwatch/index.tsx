import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

interface StopWatchProps {
  minutes?: number
}

interface Session {
  id: number,
  start: Date,
  end: Date | null,
  created_at: Date,
  updated_at: Date
}

function Stopwatch(props: StopWatchProps) {

  let isActive: boolean = false;
  let pMinutes: number = 0;

  if(props["minutes"]){
    isActive = true;
    pMinutes = props.minutes;
  }

  const [sActive, setActive] = useState(isActive);
  const [sMinutes, setMinutes] = useState(pMinutes);
  const [sTotal, setTotal] = useState(0);

  totalTimeSpentToday().then(result => setTotal(result)).catch(e => console.log(e));

  useEffect(() => {

  }, [props, sMinutes, sActive]);

  let h: number = 0;
  let m: number = 0;

  if(sActive){
    h = Math.floor(sMinutes / 60);
    m = sMinutes % 60;
  }else{
    h = Math.floor(sTotal / 60);
    m = sTotal % 60;
  }

  return(
    <Grid container>
      <Grid item xs={12} id="title">
        <h1>
          {sActive ? "TIME SPENT TODAY: " + (minutesToHouresFormated(sTotal + sMinutes)).toString() : "TOTAL TIME SPENT TODAY"}
        </h1>
        <br/><br/>
      </Grid>
      <Grid container item xs={12} style={{textAlign: "center"}}>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={10} id="digits">
          {h < 10 ? "0" + h.toString() : h.toString()}&nbsp;:&nbsp;{(m < 10 ? "0" : "" ) + m.toString()}
        </Grid>
        <Grid item xs={1}>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={4} style={{textAlign: "center"}}>
          HOURS
        </Grid>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={4} style={{textAlign: "center"}}>
          MINUTES
        </Grid>
        <Grid item xs={1}>
        </Grid>
      </Grid>
      <Grid item xs={12} className="button-container">
          <Button style={{width: "100%", backgroundColor: "#A1A1A1", color: "white"}}><b>REPORTS</b></Button>
      </Grid>
      <Grid item xs={12} className="button-container">
          <Button style={{
            width: "100%",
            backgroundColor: "#06c383",
            color: "white"
          }}>
            <b>CLOCK IN</b>
          </Button>
      </Grid>
      {sActive.toString()}<br/>
      {sMinutes}<br/>
      {minutesToHouresFormated(sTotal)}
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