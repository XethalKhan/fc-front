import React, { useState, useEffect } from 'react';
import './ReportPage.css';

import Report from './../Report';
import Top from './../Top';

import Grid from '@material-ui/core/Grid';

import { useAppSelector } from './../../lib/redux/hooks';

import { useHistory } from "react-router-dom";

function ReportPage() {

  const dateObj: Date = new Date();
  const [sDate, setDate] = useState(dateObj);

  let emptyList: Date[] = [];
  for(let i = 0; i < 3; i++){
    let tmp = new Date(dateObj.getTime() - i*24*60*60*1000);
    emptyList.push(tmp);
  }
  const [sList, setList] = useState(emptyList);

  const isLogedIn = useAppSelector((state) => state.user.access);

  const history = useHistory();

  useEffect(() => {
    if(!isLogedIn){
      history.push('/sign-in');
    }
  }, [isLogedIn]);

  if(!isLogedIn){
    return(null);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Top />
      </Grid>
      <Grid item xs={12} id="title"><h1>REPORTS</h1></Grid>
      {sList.map((row, index) => <Grid item xs={12} key={index}>
        <Report date={row}/>
      </Grid>)}
    </Grid>
  )

}

export default ReportPage;
