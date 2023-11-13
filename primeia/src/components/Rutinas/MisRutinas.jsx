import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from 'react';
import { AccordionDetails, Grid, IconButton } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import './MisRutinas.css'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import MisEjercicios from './MisEjercicios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from "react-router-dom";


// ...
export default function MisRutinas(props) {
  //Constantes a utilizar en el componente
  const Hoy = new Date();
  const navigate = useNavigate(); //navigate utilizado para navegar entre paginas
  const [MensajeError, setMensajeError] = useState('');
  const [SnackbarSuccessOpen, setSnackbarSuccessOpen] = React.useState(false);
  const [SnackbarFailOpen, setSnackbarFailOpen] = React.useState(false);
  const [ConfirmationOpen, setOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Define isDrawerOpen in the state
  const [Day, setDay] = React.useState(Hoy.getDay());//Obtenemos que dia es hoy
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const [routineObject, setRoutineObject] = useState([]); //Objeto que contiene la rutina


  

  // Informacion de rutina para cada dia
  const [NombreRutina, setNombreRutina] = useState('');
  const [dayRoutine, setDayRoutine] = useState([]); //Dia de la rutina
  const [MisRutinas, setMisRutinas] = useState(true); //Indicar si estamos en el componente de rutinas
  const [Ejercicios, setMisEjercicios] = useState(false); //Indicar si estamos en el componente de ejercicios
  //obtenemos el correo de los props
  const correo = props.email
  const edad = props.edad
  const peso = props.peso
  const estatura = props.estatura
  const genero = props.genero
  const open = props.open
 
  //Funcion para cambiar de dia de rutina
  function changeDay(day) {

    setDayRoutine(objetoAArray(routineObject[day]).splice(1));
    setDay(day);


  }

  //Funcion para abrir el snackbar de exito
  const SnackbarSuccessClose = () => {
    setSnackbarSuccessOpen(false);
  };

  

  //Funcion para abrir el snackbar de error
  const SnackbarFailClose = () => {
    setSnackbarFailOpen(false);
  };

  //Funcion para abrir el dialogo de confirmacion
  const handleClickOpen = () => {
    setOpen(true);
  };
  //Funcion para cerrar el dialogo de confirmacion
  const handleClose = () => {
    setOpen(false);
  };




  function convertirObjetoAArray(objeto) {
    const arrayResultante = [];

    for (const diaSemana in objeto) {
      if (objeto.hasOwnProperty(diaSemana)) {
        const ejercicios = objeto[diaSemana];
        const dia = {
          dia: diaSemana,
          ejercicios: []
        };

        for (const ejercicio of ejercicios) {
          dia.ejercicios.push(ejercicio);
        }

        arrayResultante.push(dia);
      }
    }

    return arrayResultante;
  }

  function objetoAArray(objeto) {
    const arrayResultado = [];

    // Itera sobre las claves del objeto
    for (const clave in objeto) {
      if (Array.isArray(objeto[clave])) {
        // Si el valor es un arreglo, itera sobre los elementos del arreglo y agrégalo al resultado
        objeto[clave].forEach((elemento) => {
          arrayResultado.push(elemento);
        });
      } else {
        // Si no es un arreglo, agrega la clave y el valor como un objeto al resultado
        const objetoTemporal = {};
        objetoTemporal[clave] = objeto[clave];
        arrayResultado.push(objetoTemporal);
      }
    }

    return arrayResultado;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8888/routineObject', { correo: correo }, { headers: { Authorization: `Bearer ${token}` } });
        setRoutineObject(convertirObjetoAArray(response.data.rutina));
        const updatedDayRoutine = objetoAArray(convertirObjetoAArray(response.data.rutina)[Day]).splice(1);
        setDayRoutine(updatedDayRoutine);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(dayRoutine);

  //Funcion para eliminar una rutina
  async function eliminarRutina(idr) {
    setOpen(false);
    try {
      const response = await axios.post('http://localhost:8888/DeleteRutina', { correo:correo ,id_rutina: idr }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      const data = response.data;
      if (data.status === 1) {
        setSnackbarSuccessOpen(true);
      }
    } catch (error) {
      setMensajeError('Algo ha salido mal!');
      setSnackbarFailOpen(true);
    }
  }
  
  //Funcion para navegar a cuestioario de Crear Rutina
  function createRoutine(){
    navigate("/CreateRoutine", {state:{correo:correo, edad:edad, peso:peso, estatura:estatura, genero:genero}}); 
  }





  const ref = React.useRef(null);


  return (
    
    <Box style={{ overflowX: 'auto' }}>
      {MisRutinas ? /*Si estamos en el componente de rutinas*/
      <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
        <Grid container spacing={5}>
          <Grid item xs={4} md={4} lg={4} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ display: 'flex', flexDirection: 'column', height: 45, alignItems: 'center', backgroundColor: '#8ad449' }} onClick={toggleDrawer}>
              <IconButton edge="start" color="inherit" sx={{ width: '100%', height: '100%' }} onClick={()=>createRoutine()}>
                <Typography component="h1" variant="h6" color="white" noWrap sx={{ flexGrow: 1 }}>
                  CREAR UNA NUEVA RUTINA
                </Typography>
                <FitnessCenterIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={12} md={18} lg={19}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '40vh', alignItems: 'center', justifyContent: 'space-around' }}>
              <Typography component="h1" variant="h6" color="#3996D4" noWrap>
                RUTINAS DEL DÍA
              </Typography>
              {dayRoutine.length === 0 ? (
                <Typography color="black" variant="body1" sx={{ mb: 4 }} >NO HAY RUTINAS EN ESTE DÍA</Typography>
              ) : (
                dayRoutine.map((ejercicio, index) => ( console.log("aca",ejercicio),
                  <Accordion key={index} sx={{ width: '100%', maxWidth: 360, bgcolor: '#8ad449' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <ListItem>
                        <Typography component="h1" variant="h6" color="white" noWrap sx={{ flexGrow: 1 }}>
                          {ejercicio.nr}
                        </Typography>
                        <ListItemAvatar>
                          <Avatar>
                            <FitnessCenterIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText />
                      </ListItem>
                    </AccordionSummary>
                    <AccordionDetails sx={{ display: 'flex', justifyContent: 'space-around', bgcolor: 'background.paper' }}>
                      <IconButton color="primary" onClick={() => {setMisEjercicios(true); setMisRutinas(false);}} aria-label="edit" component="span" sx={{ backgroundColor: '#3996D4', borderRadius: 2 }}>
                        <Typography component="h1" variant="h6" color="white" noWrap sx={{ flexGrow: 1 }}>
                          Ver ejercicios
                        </Typography>
                      </IconButton>
                      <IconButton color="secondary" aria-label="delete" component="span" sx={{ backgroundColor: 'red', borderRadius: 2 }} onClick={handleClickOpen}>
                        <Typography component="h1" variant="h6" color="white" noWrap sx={{ flexGrow: 1 }}>
                          Borrar Rutina
                        </Typography>
                      </IconButton>
                      <Dialog 
                        open={ConfirmationOpen}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Esta seguro que desea eliminar esta rutina?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Una vez eliminada no podra recuperarla, la unica opcion es crear una nueva rutina.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancelar</Button>
                          <Button onClick={() => eliminarRutina(ejercicio.idr)} autoFocus>
                            Confirmar
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </AccordionDetails>
                  </Accordion>
                  
                ))
              )}
            </Paper>
          </Grid>
        </Grid>
        
                    

            <Snackbar open={SnackbarSuccessOpen} autoHideDuration={6000} onClose={SnackbarSuccessClose}>
              <MuiAlert elevation={6} variant="filled" onClose={SnackbarSuccessClose} severity="success" sx={{ width: '20%', position:'fixed', left:'78%', top:'90%' }}>
                Rutina Eliminada Exitosamente!
              </MuiAlert>
            </Snackbar>

            <Snackbar open={SnackbarFailOpen} autoHideDuration={6000} onClose={SnackbarFailClose}>
              <MuiAlert elevation={6} variant="filled" onClose={SnackbarFailClose} severity="error" sx={{ width: '20%', position:'fixed', left:'78%', top:'90%' }}>
                {MensajeError}
              </MuiAlert>
            </Snackbar>
      </Container>
      : '' /* Acaba el componente de Rutinas*/}




      {Ejercicios ? /*Si estamos en el componente de ejercicios*/
        <MisEjercicios email={correo} open={open} dayRoutine = {dayRoutine} setRutinasPage = {props.setRutinasPage} dia = {Day}  />
        : '' /* Acaba el componente de ejercicios*/}

      <BottomNavigation
        showLabels
        variant="scrollable"
        sx={{
          position: 'fixed',
          bottom: 0,
          height: '90px',
          width: '100%',
          zIndex: 1000,
          background: 'white',
          pr: open ? 28 : 14,
        }}
        value={Day}
        onChange={(event, newDay) => {changeDay(newDay); setMisEjercicios(false); setMisRutinas(true);}}

      >
        {Day === 1 ? (
          <BottomNavigationAction className='select' value={1} sx={{ background: '#3996D4', flex: 1, fontSize: '16px', color: 'red' }} label="LUNES" />
        ) : (
          <BottomNavigationAction value={1} sx={{ flex: 1, minWidth: 'auto' }} label="LUNES" />
        )}
        {Day === 2 ? (
          <BottomNavigationAction className='select' value={2} sx={{ background: '#3996D4', flex: 1, minWidth: 'auto' }} label="MARTES" />
        ) : (
          <BottomNavigationAction value={2} sx={{ flex: 1, minWidth: 'auto' }} label="MARTES" />
        )}
        {Day === 3 ? (
          <BottomNavigationAction className='select' value={3} sx={{ background: '#3996D4', flex: 1, minWidth: 'auto' }} label="MIERCOLES" />
        ) : (
          <BottomNavigationAction value={3} sx={{ flex: 1, minWidth: 'auto' }} label="MIERCOLES" />
        )}
        {Day === 4 ? (
          <BottomNavigationAction className='select' value={4} sx={{ background: '#3996D4', flex: 1, minWidth: 'auto' }} label="JUEVES" />
        ) : (
          <BottomNavigationAction value={4} sx={{ flex: 1, minWidth: 'auto' }} label="JUEVES" />
        )}
        {Day === 5 ? (
          <BottomNavigationAction className='select' value={5} sx={{ background: '#3996D4', flex: 1, minWidth: 'auto' }} label="VIERNES" />
        ) : (
          <BottomNavigationAction value={5} sx={{ flex: 1, minWidth: 'auto' }} label="VIERNES" />
        )}
        {Day === 6 ? (
          <BottomNavigationAction className='select' value={6} sx={{ background: '#3996D4', flex: 1, minWidth: 'auto' }} label="SABADO" />
        ) : (
          <BottomNavigationAction value={6} sx={{ flex: 1, minWidth: 'auto' }} label="SABADO" />
        )}
        {Day === 0 ? (
          <BottomNavigationAction className='select' value={0} sx={{ background: '#3996D4', flex: 1, minWidth: 'auto' }} label="DOMINGO" />
        ) : (
          <BottomNavigationAction value={0} sx={{ flex: 1, minWidth: 'auto' }} label="DOMINGO" />
        )}
      </BottomNavigation>
    </Box>
  );


}