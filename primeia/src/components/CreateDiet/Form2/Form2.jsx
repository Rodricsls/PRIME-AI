import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Form2.css';
import { Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
;



export default function CheckboxLabels(props) {
  return (

    <div className='custom-scrollbar' style={{width:'50%', maxHeight: '500px', overflowY: 'auto' }}>

      <Typography>
        Cual es tu objetivo para una Dieta?
      </Typography>

      <RadioGroup value={props.objetivo} onChange={props.handleObjetivoChange}  >
        <FormControlLabel  value="Pérdida de Peso" aria-required control={<Radio/>} label="Pérdida de Peso" />
        <FormControlLabel value="Ganancia Muscular" aria-required control={<Radio />} label="Ganancia Muscular" />
        <FormControlLabel  value="Mantenimiento de Peso saludable" aria-required control={<Radio/>} label="Mantenimiento de Peso saludable" />
        <FormControlLabel value="Mejora de Salud CardioVascular" aria-required control={<Radio />} label="Mejora de Salud CardioVascular" />
      </RadioGroup>
    </div>
  );
}