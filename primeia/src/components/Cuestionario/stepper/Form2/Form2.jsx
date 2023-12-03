import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './Form2.css';
import { Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';



export default function CheckboxLabels(props) {
  return (

    <div className='custom-scrollbar' style={{width:'50%', maxHeight: '500px', overflowY: 'auto' }}>
      <Typography>
        Selecciona los días a la semana en los que puedes realizar ejercicio:
      </Typography>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox color='success' name="domingo" onChange={props.handleDiaChange} />}
          label="Domingo"
        />
        <FormControlLabel
          control={<Checkbox color='success' name="lunes" onChange={props.handleDiaChange} />}
          label="Lunes"
        />
        <FormControlLabel
          control={<Checkbox color='success' name="martes" onChange={props.handleDiaChange} />}
          label="Martes"
        />
        <FormControlLabel
          control={<Checkbox color='success' name="miercoles" onChange={props.handleDiaChange} />}
          label="Miercoles"
        />
        <FormControlLabel
          control={<Checkbox color='success' name="jueves" onChange={props.handleDiaChange} />}
          label="Jueves"
        />
        <FormControlLabel
          control={<Checkbox color='success' name="viernes" onChange={props.handleDiaChange} />}
          label="Viernes"
        />
        <FormControlLabel
          control={<Checkbox color='success' name="sabado" onChange={props.handleDiaChange} />}
          label="Sabado"
        />
      </FormGroup>

      <Typography>
        Selecciona cuanto tiempo puedes dedicarle a tus ejercicios al día:
      </Typography>

      <RadioGroup value={props.tiempo} onChange={props.handleTiempoChange}  >
        <FormControlLabel  value="20 minutos" aria-required control={<Radio color='success'/>} label="20 minutos" />
        <FormControlLabel value="30 minutos" aria-required control={<Radio color='success'/>} label="30 minutos" />
        <FormControlLabel  value="40 minutos" aria-required control={<Radio color='success'/>} label="40 minutos" />
        <FormControlLabel value="1 hora o más" aria-required control={<Radio color='success'/>} label="1 hora o más" />
      </RadioGroup>

      <Typography>
        Cual es tu objetivo para una Dieta?
      </Typography>

      <RadioGroup value={props.objetivo} onChange={props.handleObjetivoChange}  >
        <FormControlLabel  value="Pérdida de Peso" aria-required control={<Radio color='success'/>} label="Pérdida de Peso" />
        <FormControlLabel value="Ganancia Muscular" aria-required control={<Radio color='success'/>} label="Ganancia Muscular" />
        <FormControlLabel  value="Mantenimiento de Peso saludable" aria-required control={<Radio color='success'/>} label="Mantenimiento de Peso saludable" />
        <FormControlLabel value="Mejora de Salud CardioVascular" aria-required control={<Radio color='success'/>} label="Mejora de Salud CardioVascular" />
      </RadioGroup>

      <Typography>
        Que tipo de ejercicio te gustaria realizar?
      </Typography>

      <RadioGroup value={props.tipo_ejercicio} onChange={props.handleTipoRutinaChange} >
        <FormControlLabel  value="flexibilidad" aria-required control={<Radio color='success'/>} label="flexibilidad" />
        <FormControlLabel value="Resistencia Física" aria-required control={<Radio color='success'/>} label="Resistencia Física" />
        <FormControlLabel  value="Calistenia" aria-required control={<Radio color='success'/>} label="Calistenia" />
        <FormControlLabel value="Fuerza" aria-required control={<Radio color='success'/>} label="Fuerza" />
      </RadioGroup>

      <Typography>
            Dale un Nombre a tu rutina:
        </Typography>
      
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <TextField value={props.nombreRutina} onChange={props.handleNombreRutinaChange}  min='20' id="outlined-basic" label="" variant="outlined" />
        </Box>


    </div>
  );
}