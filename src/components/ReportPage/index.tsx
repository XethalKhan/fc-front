import React, { useState, useEffect } from 'react';
import './ReportPage.css';

import Report from './../Report';

import Grid from '@material-ui/core/Grid';

interface ReportPageProps {
  date: string
}

function ReportPage(props: ReportPageProps) {

  let pDate: string = props.date;

  const [sDate, setDate] = useState(pDate);
  const dateObj: Date = new Date(sDate);

  let emptyList: string[] = [];

  for(let i = 0; i < 10; i++){
    let tmp = new Date(dateObj.getTime() - i*24*60*60*1000);

    let month = tmp.getUTCMonth() + 1; //months from 1-12
    let day = tmp.getUTCDate();
    let year = tmp.getUTCFullYear();

    emptyList.push(year + "-" + month + "-" + day);
  }

  const [sList, setList] = useState(emptyList);

  return (
    <Grid container>
      <Grid item xs={12} id="title"><h1>REPORTS</h1></Grid>
      {sList.map((row, index) => <Grid item xs={12} key={index}><Report date={row}/></Grid>)}
    </Grid>
  )

}

export default ReportPage;
