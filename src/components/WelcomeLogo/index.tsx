import React, {useState, useEffect} from 'react';

import Grid from '@material-ui/core/Grid';
//import Button from '@material-ui/core/Button';

import {
  useLocation,
  Link
} from "react-router-dom";

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function WelcomeLogo(){


  return (<Grid container style={{textAlign: "center"}}>
    <Grid item xs={12}>
      <br/><br/>
      <AccessAlarmIcon style={{
        color: "#06c383",
        width: "150px",
        height: "150px"
      }}/>
      <br/><br/>
      </Grid>
      <Grid item xs={12}>
        <br/><br/>
        <span style={{
          color: "#06c383",
          fontSize: "25px",
          fontWeight: "bold"}}>
          TIME
        </span>
        &nbsp;&nbsp;&nbsp;
        <span style={{
          color: "white",
          fontSize: "25px",
          fontWeight: "bold"
        }}>
          TRACK.
        </span>
        <br/><br/>
        </Grid>
    </Grid>);

}

export default WelcomeLogo;
