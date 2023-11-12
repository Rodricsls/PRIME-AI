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

import {Link} from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Cuestionario.css';
import { Password } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import axios from 'axios';



export default function CreateRoutine() {
  const location = useLocation();
  const [SnackbarSuccessOpen, setSnackbarSuccessOpen] = React.useState(false);
  const [SnackbarFailOpen, setSnackbarFailOpen] = React.useState(false);
  const [MensajeError, setMensajeError] = React.useState('');
  const [objetivo, setObjetivo] = React.useState('');
  const [dedicacion, setDedicacion] = React.useState('');
  const [equipo, setEquipo] = React.useState('');
  const [tiempo, setTiempo] = React.useState('');
  const [tipo_ejercicio, setTipoEjercicio] = React.useState('');
  const [NombreRutina, setNombreRutina] = React.useState('');

 
  
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
  const navigate = useNavigate();
  const correoUsuario = location.state.correo;
  const edadUsuario = location.state.edad;
  const pesoUsuario = location.state.peso;
  const estaturaUsuario = location.state.estatura;
  const generoUsuario = location.state.genero;



  const handleDiaChange = (event) => {
    const { name, checked } = event.target;
    setDia({
      ...dia,
      [name]: checked,
    });
  };


  const handleNombreRutinaChange = (event) => {
    setNombreRutina(event.target.value);
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

  

  const SnackbarSuccessClose = () => {
    setSnackbarSuccessOpen(false);
  };

  
const SnackbarFailClose = () => {
    setSnackbarFailOpen(false);
  };

  function finishForm() {
    navigate('/Home');//Regresamos a la pagina  de login
  }

  const stepsData = [
    {
      label: 'Paso 1',
      // Renderiza el formulario correspondiente para el Paso 1
      form:<Form1/>,
    },
    {
      label: 'Paso 2',
      // Renderiza el formulario correspondiente para el Paso 2
      form: <Form2 className="questions"
              NombreRutina={NombreRutina}
              handleNombreRutinaChange={handleNombreRutinaChange} />,
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


  //Register a user using axios 

  async function crearRutina(){
      try{ 
        const token = localStorage.getItem('token'); 
        const response = await axios.post('http://localhost:8888/createRoutine',{correo:correoUsuario,
                                                                                  tipo_ejercicio:tipo_ejercicio,
                                                                                  edad:edadUsuario,
                                                                                  peso:pesoUsuario,
                                                                                  estatura:estaturaUsuario,
                                                                                  dedicacion:dedicacion,
                                                                                  dias:dia,
                                                                                  tiempo:tiempo ,
                                                                                  equipo:equipo, 
                                                                                  genero:generoUsuario,
                                                                                  nombre_rutina:NombreRutina}, { headers:{Authorization:`Bearer ${token}`} });
        const data= response.data;
        console.log(data);
        if(data.status === 1){
          setSnackbarSuccessOpen(true);
          navigate("/Home", {state:{email:correoUsuario}}); //navegamos a la pagina Home y enviamos el email para que sea utilizado en las demas paginas
          console.log("Rutina creada exitosamente");

        }else{
          console.log(data);
          setMensajeError('Ha ocurrido un error');
          setSnackbarFailOpen(true);
          
        }
      }catch(error){
        console.log(error);
        setMensajeError('Ha ocurrido un error')
        setSnackbarFailOpen(true);
      }

  }



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
                  onClick={() => crearRutina()}
                >
                
                  Finish
                
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{color:'white', bgcolor:' #6dbf26'}}
                  onClick={handleNext}
                >
                Next
                  </Button>
              )}
              </div>
            </div>
          </div>
        </Box>
      </Stack>
        <Snackbar open={SnackbarSuccessOpen} autoHideDuration={6000} onClose={SnackbarSuccessClose}>
      <MuiAlert elevation={6} variant="filled" onClose={SnackbarSuccessClose} severity="success" sx={{ width: '20%', position:'fixed', left:'78%', top:'90%' }}>
        Rutina creada exitosamente!
      </MuiAlert>
    </Snackbar>

    <Snackbar open={SnackbarFailOpen} autoHideDuration={6000} onClose={SnackbarFailClose}>
      <MuiAlert elevation={6} variant="filled" onClose={SnackbarFailClose} severity="error" sx={{ width: '20%', position:'fixed', left:'78%', top:'90%' }}>
        {MensajeError}
      </MuiAlert>
    </Snackbar>
    </Grid>
    
  );
}
