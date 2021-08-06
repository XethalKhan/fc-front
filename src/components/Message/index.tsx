import React from 'react';
//import './Message.css';

import Grid from '@material-ui/core/Grid';

import { useAppSelector } from './../../lib/redux/hooks';


function Message(){

  const message: string = useAppSelector((state) => state.message.text);
  const type: string = useAppSelector((state) => state.message.type);

  let color: string = "none";

  if(type === "error"){
    color = "red";
  }else if(type === "success"){
    color = "#06C383";
  }

  return(<h1 style={{
    color: color,
    visibility: color === "none" ? 'hidden' : 'visible' }}
    >
      {message}
    </h1>);

}

export default Message;
