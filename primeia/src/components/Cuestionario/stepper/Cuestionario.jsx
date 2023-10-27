import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Stack, TextField } from '@mui/material';
import Form2 from './Form2/Form2';
import Form1 from './Form1/Form1';
import Form3 from './Form 3/Form3';
import {Link} from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Cuestionario.css';
import { Password } from '@mui/icons-material';


export default function Cuestionario() {
  const [alimentacion, setAlimentacion] = React.useState('');
  const [restricciones, setRestricciones] = React.useState('');
  const [objetivo, setObjetivo] = React.useState('');
  const [dedicacion, setDedicacion] = React.useState('');
  const [equipo, setEquipo] = React.useState('');
  const [tiempo, setTiempo] = React.useState('');
  const [tipo_ejercicio, setTipoEjercicio] = React.useState('');
  const [edad, setEdad] = React.useState(20);
  const [estatura, setEstatura] = React.useState(100);
  const [peso, setPeso] = React.useState(70);
  const [genero, setGenero] = React.useState('');
  const [dia, setDia]= React.useState({
    domingo: false,
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false
  });
  //Obteniendo informacion enviada desde Cuestionario
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state.Nombre;
  const apellido = location.state.Apellido;
  const email = location.state.Email;
  const password = location.state.Password;
  const confirmpassword = location.state.ConfirmedPassword;
 

  const handleEdadChange = (event) => {
    setEdad(event.target.value);
  };

  const handleEstaturaChange = (newValue) => {
    setEstatura(newValue);
  };

  const handlePesoChange = (newValue) => {
    setPeso(newValue);
  };

  const handleDiaChange = (event) => {
    const { name, checked } = event.target;
    setDia({
      ...dia,
      [name]: checked,
    });
  };

  const handleGeneroChange = (event) => {
    setGenero(event.target.value);
  };

  const handleTipoRutinaChange = (event) => {
    setTipoEjercicio(event.target.value);
  };

  const handleTiempoChange = (event) => {
    setTiempo(event.target.value);
  };

  const handleDedicacionChange = (event) => {
    setDedicacion(event.target.value);
  };

  const handleEquipoChange = (event) => {
    setEquipo(event.target.value);
  };

  const handleObjetivoChange = (event) => {
    setObjetivo(event.target.value);
  };

  const handleRestriccionesChange = (event) => {
    setRestricciones(event.target.value);
  };

  const handleAlimentacionChange = (event) => {
    setEquipo(event.target.value);
  };

  function finishForm() {
    navigate('/');//Regresamos a la pagina  de login
  }

  const stepsData = [
    {
      label: 'Paso 1',
      // Renderiza el formulario correspondiente para el Paso 1
      form:<Form1
            dedicacion = {dedicacion}
            handleDedicacionChange = {handleDedicacionChange}
            equipo = {equipo} 
            handleEquipoChange = {handleEquipoChange}
            alimentacion = {alimentacion}
            handleAlimentacionChange = {handleAlimentacionChange}
            restricciones = {restricciones}
            handleRestriccionesChange = {handleRestriccionesChange} />,
    },
    {
      label: 'Paso 2',
      // Renderiza el formulario correspondiente para el Paso 2
      form: <Form2 className="questions" 
              dia={dia} 
              handleDiaChange={handleDiaChange}
              tiempo = {tiempo}
              handleTiempoChange = {handleTiempoChange}
              objetivo = {objetivo}
              handleObjetivoChange = {handleObjetivoChange}
              tipo_ejercicio = {tipo_ejercicio}
              handleTipoRutinaChange = {handleTipoRutinaChange}
               />,
    },
    {
      label: 'Paso 3',
      // Renderiza el formulario correspondiente para el Paso 3
      form: <Form3  edad={edad}
      estatura={estatura}
      peso={peso}
      handleEdadChange={handleEdadChange}
      handleEstaturaChange={handleEstaturaChange}
      handlePesoChange={handlePesoChange} 
      genero = {genero} 
      handleGeneroChange = {handleGeneroChange}/>,
    },
    // Agrega más pasos según sea necesario
  ];
  //Indica cual step es el activo  
  const [activeStep, setActiveStep] = React.useState(0);

  //Maneja el paso al siguiente step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  //Nos permite regresar al paso anterior
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const currentStep = stepsData[activeStep];

  return (
    <Grid className='main' container component="main" sx={{ minHeight: '100vh', width:'100%', height:'100vh', minWidth:'100vh' }}>

      <Stack className='stack'sx={{ width: '100%' }} >
        <Box className='box' sx={{ width: '100%' }}>
          <div>
            <Stepper activeStep={activeStep} className='custom-stepper'>
              {stepsData.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div className='combo'>
              {currentStep ? (
              <div className='form'>{currentStep.form}</div>
              ) : null}
              <div className='buttons'>
                <Button
                  variant="contained"
                  disabled={activeStep === 0}
                  sx={{color:'white', bgcolor:' #6dbf26'}}
                  onClick={handleBack}
                >
                  Back
                </Button>
                
                  {activeStep === stepsData.length - 1 ? (
                  <Button
                  variant="contained"
                  sx={{color:'white', bgcolor:' #6dbf26'}}
                  onClick={() => finishForm()}
                >
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                  Finish
                </Link>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{color:'white', bgcolor:' #6dbf26'}}
                  onClick={handleNext}
                >
                'Next'
                  </Button>
              )}
              </div>
            </div>
          </div>
        </Box>
      </Stack>
    </Grid>
  );
}
