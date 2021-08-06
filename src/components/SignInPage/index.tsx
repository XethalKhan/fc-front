import React, { useState, useEffect } from 'react';
import './SignInPage.css';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import type { RootState } from './../../lib/redux/store';

import { useAppSelector, useAppDispatch } from './../../lib/redux/hooks';
import { loginSuccessAction, loginAttemptThunk } from './../../lib/redux/user';

import InputText from './../InputText';

import { useHistory } from "react-router-dom";

function SignInPage(){

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogedIn = useAppSelector((state) => state.user.access);

  const history = useHistory();

    useEffect(() => {

      if(isLogedIn){
        history.push('/');
      }

    }, [isLogedIn]);

  return(
    <Grid container spacing={3}>
     <Grid item xs={12}>
     </Grid>
     <Grid item xs={12}>
       <InputText
        label="EMAIL"
        style={{width: "100%"}}
        placeholder="email@example.com"
        InputLabelProps={{shrink: true}}
        onChange={(e)=>{setEmail(e.target.value)}}
        />
     </Grid>
     <Grid item xs={12}>
      <InputText
      type="password"
      label="PASSWORD"
      style={{width: "100%"}}
      placeholder="5+ characters"
      InputLabelProps={{shrink: true}}
      onChange={(e)=>{setPassword(e.target.value)}}
      />
     </Grid>
     <Grid item xs={12}>
     </Grid>
     <Grid item xs={12} style={{textAlign: "center"}}>
      <Button style={{
          width: "100%",
          backgroundColor: "#06c383",
          color: "white"
        }}
        type="submit"
        onClick={()=> {
          //https://stackoverflow.com/questions/64857870/how-to-dispatch-thunkaction-with-redux-thunk-and-typescript
          (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(loginAttemptThunk(email, password));
        }
        }>SIGN IN</Button>
     </Grid>
    </Grid>
  );

}

export default SignInPage;
