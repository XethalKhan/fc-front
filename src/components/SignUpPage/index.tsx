import React, { useState, useEffect } from 'react';
import './SignUpPage.css';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import type { RootState } from './../../lib/redux/store';

import { useAppDispatch } from './../../lib/redux/hooks';
import { createUserAttemptThunk } from './../../lib/redux/user';

import { Link } from "react-router-dom";

import InputText from './../InputText';
import WelcomeLogo from './../WelcomeLogo';

function SignUpPage(){

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  return(
    <Grid container spacing={3} style={{backgroundColor: "#202630"}}>
     <Grid item xs={12}>
      <WelcomeLogo />
     </Grid>
     <Grid item xs={12}>
       <InputText label="FULL NAME" placeholder="John Doe" onChange={(e) => setFullName(e.target.value)}/>
     </Grid>
     <Grid item xs={12}>
       <InputText label="EMAIL"placeholder="email@example.com" onChange={(e) => setEmail(e.target.value)}/>
     </Grid>
     <Grid item xs={12}>
      <InputText
        label="PASSWORD"
        placeholder="5+ characters"
        type="password"
        onChange={(e) => setPassword(e.target.value)}/>
     </Grid>
     <Grid item xs={12}>
     </Grid>
     <Grid item xs={12} style={{textAlign: "center"}}>
      <Button style={{
          width: "100%",
          backgroundColor: "#06c383",
          color: "white"
        }}
        onClick={() => {
          //https://stackoverflow.com/questions/64857870/how-to-dispatch-thunkaction-with-redux-thunk-and-typescript
          (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(createUserAttemptThunk(fullName, email, password));
        }}
        >SIGN UP</Button>
     </Grid>
     <Grid item xs={12} style={{color: "white", textAlign: "center"}}>
      Already a member?&nbsp;&nbsp;&nbsp;
      <Link to="/sign-in" style={{color: "#06c383"}}>SIGN IN</Link>
      <br/>
     </Grid>
     <Grid item xs={12} style={{color: "#8F9297", textAlign: "center"}}>
      By clicking Sign up, you agree to TIME TRACK's<br/>
      <b>Terms and Conditions</b> and <b>Privacy Policy</b>.<br/><br/>
     </Grid>
    </Grid>
  );

}

export default SignUpPage;
