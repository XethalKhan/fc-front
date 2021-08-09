import React, { useState, useEffect } from 'react';
import './ReportRow.css';

import Grid from '@material-ui/core/Grid';

interface Session {
  id: number,
  start: Date,
  end: Date | null,
  created_at: Date,
  updated_at: Date
}

interface ReportRowProps {
  session: Session
}

function ReportRow(props: ReportRowProps){

  let start_hour: number = props.session.start.getHours();
  let start_minute: number = props.session.start.getMinutes();

  let start_time: string = start_hour < 10 ? "0" + start_hour.toString() : start_hour.toString();
  start_time += ":";
  start_time += start_minute < 10 ? "0" + start_minute.toString() : start_minute.toString();

  let end_time: string = "ACTIVE";
  let duration: string = "";
  if(props.session.end !== null){
    let end_hour: number = props.session.end.getHours();
    let end_minute: number = props.session.end.getMinutes();

    end_time = end_hour < 10 ? "0" + end_hour.toString() : end_hour.toString();
    end_time += ":";
    end_time += end_minute < 10 ? "0" + end_minute.toString() : end_minute.toString();

    let difference: number = Math.floor((props.session.end.getTime() - props.session.start.getTime()) / 60000);

    duration = minutesToHouresFormated(difference);
  }

  return <Grid container item className="row">
    <Grid item xs={2} style={{padding: 10, paddingLeft: 2}}>{start_time}&nbsp;-&nbsp;{end_time}</Grid>
    <Grid item xs={8}></Grid>
    <Grid item xs={2} style={{padding: 10, paddingRight: 2}}>{duration}</Grid>
  </Grid>

}

function minutesToHouresFormated(minutes: number): string{
  let h = Math.floor(minutes / 60);
  let m = minutes % 60;

  let result: string = (h < 10 ? "0" + h.toString() : h.toString()) + "h";
  result += " ";
  result += (m < 10 ? "0" + m.toString() : m.toString()) + "m";

  return result;
}

export default ReportRow;
