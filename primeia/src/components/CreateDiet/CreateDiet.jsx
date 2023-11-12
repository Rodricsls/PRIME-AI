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

import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Cuestionario.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen'; 



export default function Cuestionario() {
  const [Loading, setLoading] = React.useState(false);

  const [SnackbarSuccessOpen, setSnackbarSuccessOpen] = React.useState(false);
  const [SnackbarFailOpen, setSnackbarFailOpen] = React.useState(false);
  const [MensajeError, setMensajeError] = React.useState('');

  const [alimentacion, setAlimentacion] = React.useState('');
  const [restricciones, setRestricciones] = React.useState('');
  const [objetivo, setObjetivo] = React.useState('');
  const [dedicacion, setDedicacion] = React.useState('');



  //Obteniendo informacion enviada desde Cuestionario
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.correo;

  const edad = location.state.edad;
  const peso = location.state.peso;
  const estatura = location.state.estatura;
  const genero = location.state.genero;


  const handleDedicacionChange = (event) => {
    setDedicacion(event.target.value);
  };


  const handleObjetivoChange = (event) => {
    setObjetivo(event.target.value);
  };

  const handleRestriccionesChange = (event) => {
    setRestricciones(event.target.value);
  };

  const handleAlimentacionChange = (event) => {
    setAlimentacion(event.target.value);
  };

  const SnackbarSuccessClose = () => {
    setSnackbarSuccessOpen(false);
  };

  
const SnackbarFailClose = () => {
    setSnackbarFailOpen(false);
  };

  function finishForm() {
    navigate('/Home',{state:{email:email}});//Regresamos a la pagina  de login
  }

  const stepsData = [
    {
      label: 'Paso 1',
      // Renderiza el formulario correspondiente para el Paso 1
      form:<Form1
            dedicacion = {dedicacion}
            handleDedicacionChange = {handleDedicacionChange}
            alimentacion = {alimentacion}
            handleAlimentacionChange = {handleAlimentacionChange}
            restricciones = {restricciones}
            handleRestriccionesChange = {handleRestriccionesChange} />,
    },
    {
      label: 'Paso 2',
      // Renderiza el formulario correspondiente para el Paso 2
      form: <Form2 className="questions"         
              objetivo = {objetivo}
              handleObjetivoChange = {handleObjetivoChange}
               />,
    },
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

  async function CrearDieta(){
    let restriccionAlimenticia = '';
      if(restricciones.toLowerCase() === 'nada'){
        restriccionAlimenticia = 'no tiene restricciones alimenticias'
      }else{
        restriccionAlimenticia = restricciones;
      }
      setLoading(true);
      try{  
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8888/createDiet',{correo:email, 
                                                                          peso:peso, estatura:estatura,edad:edad, dedicacion:dedicacion, 
                                                                           objetivo:objetivo, restricciones:restriccionAlimenticia, alimentacion:alimentacion, genero:genero}, { headers:{Authorization:`Bearer ${token}`}});        setLoading(false);                                                                  
        const data= response.data;
        if(data.status === 1){
          setSnackbarSuccessOpen(true);
          console.log(email)
          navigate("/Home", {state:{email:email}}); //navegamos a la pagina Home y enviamos el email para que sea utilizado en las demas paginas
          console.log("dieta creada correctamente");

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


      {Loading ? <LoadingScreen/> 
      
      : 

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
                  onClick={() => CrearDieta()}
                >
                
                  Finish
                
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
      }
        <Snackbar open={SnackbarSuccessOpen} autoHideDuration={6000} onClose={SnackbarSuccessClose}>
      <MuiAlert elevation={6} variant="filled" onClose={SnackbarSuccessClose} severity="success" sx={{ width: '20%', position:'fixed', left:'78%', top:'90%' }}>
        Usuario registrado exitosamente!
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
