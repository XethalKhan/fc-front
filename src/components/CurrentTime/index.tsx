import React, {useState, useEffect} from 'react';

import Grid from '@material-ui/core/Grid';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function CurrentTime(){

  let current: Date = new Date();

  // let [milisec, setMilisec] = useState(current.getTime());
  //
  // useEffect(() => {
  //
  //   let current: Date = new Date();
  //
  //   setTimeout(() => { setMilisec(current.getTime()); }, 500);
  //
  // }, [milisec]);

  let houres: number = current.getHours();
  let minutes: number = current.getMinutes();

  return(<React.Fragment>
    <br/><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;
    {DAYS[current.getDay()]}&nbsp;
    <span style={{color: "#A1A1A1"}}>
      {current.getDate()}&nbsp;{MONTHS[current.getMonth()]},&nbsp;
      {houres < 10 ? "0" + houres : houres}:
      {minutes < 10 ? "0" + minutes : minutes}
    </span>
    <br/>
    </React.Fragment>);

}

export default CurrentTime;
