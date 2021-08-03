import React, { useState, useEffect } from 'react';
import './SignUpPage.css';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {
  withStyles
} from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#06C383',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#06C383',
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottomColor: 'red'
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: "red"
    }
  },
})(TextField);

function SignUpPage(){

  return(
    <Grid container spacing={3}>
     <Grid item xs={12}>

     </Grid>
     <Grid item xs={12}>
       <CssTextField label="FULL NAME" style={{width: "100%"}} placeholder="John Doe" InputLabelProps={{shrink: true}}/>
     </Grid>
     <Grid item xs={12}>
       <CssTextField label="EMAIL" style={{width: "100%"}} placeholder="email@example.com" InputLabelProps={{shrink: true}}/>
     </Grid>
     <Grid item xs={12}>
      <CssTextField label="PASSWORD" style={{width: "100%"}} placeholder="5+ characters" InputLabelProps={{shrink: true}}/>
     </Grid>
     <Grid item xs={12}>
     </Grid>
     <Grid item xs={12} style={{textAlign: "center"}}>
      <Button style={{
          width: "100%",
          backgroundColor: "#06c383",
          color: "white"
        }}>SIGN UP</Button>
     </Grid>
    </Grid>
  );

}

export default SignUpPage;
