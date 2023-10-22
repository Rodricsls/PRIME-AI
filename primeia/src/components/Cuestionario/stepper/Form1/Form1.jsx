import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import './Form1.css';

import FormControlLabel from '@mui/material/FormControlLabel';
// 
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

export default function Form1() {

  

  return (
    <div className='custom-scrollbar' style={{width:'50%', maxHeight: '500px', overflowY: 'auto' }}>
        
        <Typography>
        ¿Que tanto le dedicas a tu actividad fisica durante la semana?
      </Typography>
      <RadioGroup  defaultValue="">
        <FormControlLabel  value="a" aria-required control={<Radio/>} label="poca" />
        <FormControlLabel value="b" aria-required control={<Radio />} label="la suficiente" />
        <FormControlLabel  value="c" aria-required control={<Radio/>} label="considerable" />
        <FormControlLabel value="d" aria-required control={<Radio />} label="demasiada" />
      </RadioGroup>
      <Typography>
        ¿Posees equipo para realizar ejercicios?
      </Typography>

      <RadioGroup  defaultValue="">
        <FormControlLabel  value="a" aria-required control={<Radio/>} label="Sí" />
        <FormControlLabel value="b" aria-required control={<Radio />} label="No" />
        <FormControlLabel value="c" aria-required control={<Radio />} label="Puedo Conseguir" />
      </RadioGroup>
      <Typography>
        ¿Que tan estricto eres con tu dieta?
      </Typography>

      <RadioGroup  defaultValue="">
        <FormControlLabel  value="a" aria-required control={<Radio/>} label="Poco" />
        <FormControlLabel value="b" aria-required control={<Radio />} label="Lo suficente" />
        <FormControlLabel value="c" aria-required control={<Radio />} label="Mucho" />
      </RadioGroup>

        <Typography>
            Algo que no puedas consumir:
        </Typography>
      
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <TextField  min='20' id="outlined-basic" label="Si no hay nada, ingresa 'NADA'" variant="outlined" />
        </Box>

   
    </div>
    
  );
}