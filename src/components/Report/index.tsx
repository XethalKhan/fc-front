import React, { useState, useEffect } from 'react';
import './Report.css';

import Grid from '@material-ui/core/Grid';

interface ReportProps {
  date: string
}

interface Session {
  id: number,
  start: Date,
  end: Date | null,
  created_at: Date,
  updated_at: Date
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function Report(props: ReportProps) {

  let pDate: string = props.date;

  const [sDate, setDate] = useState(pDate);
  const dateObj: Date = new Date(sDate);

  let emptyList: Session[] = [];

  const [sList, setList] = useState(emptyList);

  let total_duration: number = 0;

  const listItems = sList.map((row, index) => {
      let start_hour: number = row.start.getHours();
      let start_minute: number = row.start.getMinutes();

      let start_time: string = start_hour < 10 ? "0" + start_hour.toString() : start_hour.toString();
      start_time += ":";
      start_time += start_minute < 10 ? "0" + start_minute.toString() : start_minute.toString();

      let end_time: string = "ACTIVE";
      let duration: string = "";
      if(row.end !== null){
        let end_hour: number = row.end.getHours();
        let end_minute: number = row.end.getMinutes();

        end_time = end_hour < 10 ? "0" + end_hour.toString() : end_hour.toString();
        end_time += ":";
        end_time += end_minute < 10 ? "0" + end_minute.toString() : end_minute.toString();

        let difference: number = Math.floor((row.end.getTime() - row.start.getTime()) / 60000);

        duration = minutesToHouresFormated(difference);

        total_duration += difference;
      }

      return <Grid container item key={row.id} className={"row " + (index != 0 ? "report-detail-row" : "")}>
        <Grid item xs={2} style={{padding: 10, paddingLeft: 2}}>{start_time}&nbsp;-&nbsp;{end_time}</Grid>
        <Grid item xs={8}></Grid>
        <Grid item xs={2} style={{padding: 10, paddingRight: 2}}>{duration}</Grid>
      </Grid>
    }
  );

  useEffect(() => {

    getSessionsByDate(sDate)
    .then(data => {
      setList(data);
    }).catch(e => console.log(e));

  }, [props, sDate]);

  if(sList.length == 0){
    return (null);
  }

  return(
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <b>Time report for {DAYS[dateObj.getDay()]},</b>
        &nbsp;
        <span style={{color: "#A1A1A1"}}>{dateObj.getDate()}&nbsp;{MONTHS[dateObj.getMonth()]}</span>
        &nbsp;
        <b>:</b>
      </Grid>
      {listItems}
      <Grid container item xs={12} className="report-total-row">
        <Grid item xs={2} style={{padding: 10, paddingLeft: 2}}><b>Total:</b></Grid>
        <Grid item xs={8}></Grid>
        <Grid item xs={2} style={{padding: 10, paddingRight: 2}}>{minutesToHouresFormated(total_duration)}</Grid>
      </Grid>
    </Grid>
  );

}

async function getSessionsByDate(date: string): Promise<Session[]>{

  let url: string = "http://localhost:3000/session?date=" + date;

  return window.fetch(url, {
    method: "GET",
  })
  .then(response => response.json())
  .then(data => {
    let tmp: Session[] = [];

    for(let i = 0; i < data.length; i++){
      tmp.push({
        id: data[i].id,
        start: new Date(data[i].start),
        end: data[i].end === null ? null : new Date(data[i].end),
        created_at: new Date(data[i].created_at),
        updated_at: new Date(data[i].updated_at)
      });
    }

    return tmp;
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

export default Report;
