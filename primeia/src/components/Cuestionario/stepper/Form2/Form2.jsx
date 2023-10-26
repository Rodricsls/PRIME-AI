import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './Form2.css';
import { Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';



export default function CheckboxLabels(props) {
  return (

    <div className='custom-scrollbar' style={{width:'50%', maxHeight: '500px', overflowY: 'auto' }}>
      <Typography>
        Selecciona los días a la semana en los que puedes realizar ejercicio:
      </Typography>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox name="domingo" onChange={props.handleDiaChange} />}
          label="Domingo"
        />
        <FormControlLabel
          control={<Checkbox name="lunes" onChange={props.handleDiaChange} />}
          label="Lunes"
        />
        <FormControlLabel
          control={<Checkbox name="martes" onChange={props.handleDiaChange} />}
          label="Martes"
        />
        <FormControlLabel
          control={<Checkbox name="miercoles" onChange={props.handleDiaChange} />}
          label="Miercoles"
        />
        <FormControlLabel
          control={<Checkbox name="jueves" onChange={props.handleDiaChange} />}
          label="Jueves"
        />
        <FormControlLabel
          control={<Checkbox name="viernes" onChange={props.handleDiaChange} />}
          label="Viernes"
        />
        <FormControlLabel
          control={<Checkbox name="sabado" onChange={props.handleDiaChange} />}
          label="Sabado"
        />
      </FormGroup>

      <Typography>
        Selecciona cuanto tiempo puedes dedicarle a tus ejercicios al día:
      </Typography>

      <RadioGroup  defaultValue="">
        <FormControlLabel  value="a" aria-required control={<Radio/>} label="20 minutos" />
        <FormControlLabel value="b" aria-required control={<Radio />} label="30 minutos" />
        <FormControlLabel  value="c" aria-required control={<Radio/>} label="40 minutos" />
        <FormControlLabel value="d" aria-required control={<Radio />} label="1 hora o más" />
      </RadioGroup>
    </div>
  );
}