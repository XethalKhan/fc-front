import React, { useState, useEffect } from 'react';
import './Report.css';

import Grid from '@material-ui/core/Grid';

import ReportRow from './../ReportRow';

import { useAppSelector } from './../../lib/redux/hooks';

import {stringfyHouresFromMinutes} from './../../lib/util';
import {filterSession} from './../../lib/api/session';

interface ReportProps {
  date: Date
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

  const token: string = useAppSelector(state => state.user.token);

  let emptyList: Session[] = [];

  const [sList, setList] = useState(emptyList);

  let total_duration: number = 0;

  const listItems = sList.map((row, index) => {

      let ending = row.end == null ? row.start.getTime() : row.end.getTime();

      total_duration += Math.floor((ending - row.start.getTime()) / 60000);

      return <ReportRow
        session={row as Session}
        key={row.id}/>
    });

  useEffect(() => {

    getSessionsByDate(token, props.date).then(data => {
      setList(data);
    }).catch(e => console.log(e));

  }, [props]);

  if(sList.length === 0){
    return (null);
  }

  return(
    <Grid container>
      <Grid item xs={12}>
        <b>Time report for {DAYS[props.date.getDay()]},</b>
        &nbsp;
        <span style={{color: "#A1A1A1"}}>{props.date.getDate()}&nbsp;{MONTHS[props.date.getMonth()]}</span>
        &nbsp;
        <b>:</b>
      </Grid>
      {listItems}
      <Grid container item xs={12} className="report-total-row">
        <Grid item xs={2} style={{padding: 10, paddingLeft: 2}}>Total:</Grid>
        <Grid item xs={8}></Grid>
        <Grid item xs={2} style={{padding: 10, paddingRight: 2}}>{stringfyHouresFromMinutes(total_duration)}</Grid>
      </Grid>
    </Grid>
  );

}

async function getSessionsByDate(token: string, date: Date): Promise<Session[]>{

  let httpResponse = await filterSession(token, {date: date});

  if(httpResponse.status === 200){

    const data = await httpResponse.json();

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

  }else{
    return [];
  }

}

export default Report;
