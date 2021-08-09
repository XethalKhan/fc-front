import React from 'react';
import './Clock.css';

import Grid from '@material-ui/core/Grid';

interface ClockProps{
  hours: number,
  minutes: number
}

function Clock(props: ClockProps){

  let h = props.hours;
  let m = props.minutes;

  return (
    <React.Fragment>
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
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={2} style={{textAlign: "center"}}>
        HOURS
      </Grid>
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={2} style={{textAlign: "center"}}>
        MINUTES
      </Grid>
      <Grid item xs={3}>
      </Grid>
    </Grid>
    </React.Fragment>
  );

}

export default Clock;
