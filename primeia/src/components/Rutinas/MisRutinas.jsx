import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AccordionDetails, Grid, IconButton } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import './MisRutinas.css'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// ...
export default function MisRutinas(props) {
  //Constantes a utilizar en el componente
  const Hoy = new Date();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const drawerWidth = 240;
  const location = useLocation();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Define isDrawerOpen in the state
  const [Day, setDay] = React.useState(Hoy.getDay());//Obtenemos que dia es hoy
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const [selectedTab, setSelectedTab] = useState(0);
  const [routineObject, setRoutineObject] = useState([]); //Objeto que contiene la rutina

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Informacion de rutina para cada dia
  const [rutinaLunes, setRutinaLunes] = useState([]);
  const [rutinaMartes, setRutinaMartes] = useState([]);
  const [rutinaMiercoles, setRutinaMiercoles] = useState([]);
  const [rutinaJueves, setRutinaJueves] = useState([]);
  const [rutinaViernes, setRutinaViernes] = useState([]);
  const [rutinaSabado, setRutinaSabado] = useState([]);
  const [rutinaDomingo, setRutinaDomingo] = useState([]);
  const [NombreRutina, setNombreRutina] = useState('');
  const [dayRoutine, setDayRoutine] = useState([]); //Dia de la rutina
  //obtenemos el correo de los props
  const correo = props.email
  const open = props.open
  //Funcion para cambiar de dia de rutina
  function changeDay(day) {

    setDayRoutine(objetoAArray(routineObject[day]).splice(1));
    setDay(day);


  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8888/routineObject', { correo: correo });
        setRoutineObject(convertirObjetoAArray(response.data.rutina));

        const updatedDayRoutine = objetoAArray(convertirObjetoAArray(response.data.rutina)[Day]).splice(1);
        setDayRoutine(updatedDayRoutine);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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

  const ref = React.useRef(null);


  return (

    <Box style={{ overflowX: 'auto' }}>
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Grid container spacing={5}>
          <Grid item xs={4} md={4} lg={4} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ display: 'flex', flexDirection: 'column', height: 50, alignItems: 'center', backgroundColor: '#8ad449' }} onClick={toggleDrawer}>
              <IconButton edge="start" color="inherit" sx={{ width: '100%', height: '100%' }}>
                <Typography component="h1" variant="h6" color="white" noWrap sx={{ flexGrow: 1 }}>
                  CREAR UNA NUEVA RUTINA
                </Typography>
                <FitnessCenterIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={12} md={18} lg={19}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '50vh', alignItems: 'center', justifyContent: 'space-around' }}>
              <Typography component="h1" variant="h6" color="#3996D4" noWrap>
                RUTINAS DEL DÍA
              </Typography>
              {dayRoutine.length === 0 ? (
                <Typography color="black" variant="body1" sx={{ mb: 4 }} >NO HAY RUTINAS EN ESTE DÍA</Typography>
              ) : (
                dayRoutine.map((ejercicio, index) => ( console.log(ejercicio),
                  <Accordion key={index} sx={{ width: '100%', maxWidth: 360, bgcolor: '#8ad449' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <ListItem>
                        <Typography component="h1" variant="h6" color="white" noWrap sx={{ flexGrow: 1 }}>
                          {ejercicio.idr}
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
                      <IconButton color="primary" aria-label="edit" component="span" sx={{ backgroundColor: '#3996D4', borderRadius: 2 }}>
                        <Typography component="h1" variant="h6" color="white" noWrap sx={{ flexGrow: 1 }}>
                          Ver ejercicios
                        </Typography>
                      </IconButton>
                      <IconButton color="secondary" aria-label="delete" component="span" sx={{ backgroundColor: 'red', borderRadius: 2 }}>
                        <Typography component="h1" variant="h6" color="white" noWrap sx={{ flexGrow: 1 }}>
                          Borrar Rutina
                        </Typography>
                      </IconButton>
                    </AccordionDetails>
                  </Accordion>
                ))
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
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
        onChange={(event, newDay) => changeDay(newDay)}

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