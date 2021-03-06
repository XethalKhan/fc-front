import React from 'react';
import './InputText.css';

import TextField from '@material-ui/core/TextField';
import {TextFieldProps} from '@material-ui/core/TextField';

import {
  withStyles
} from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& .MuiFormLabel-root': {
      color: 'white',
      fontWeight: "bold"
    },
    '& .MuiInputBase-input': {
      color: "#8F9297",
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#8F9297',
    },
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
  }
})(TextField);

function InputText(props: TextFieldProps){

  return(<CssTextField
    {...props}
    style={{width: "100%"}}
    InputLabelProps={{shrink: true}}
    />);

}

export default InputText;
