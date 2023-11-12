// Importación de módulos y componentes necesarios
import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './MisDietas.css';
import Button from '@mui/material/Button';

// Define custom styles for the Accordion, AccordionSummary, and AccordionDetails components
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: 'white' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(255, 255, 255, .05)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

// Define la función del componente MisDietas
export default function MisDietas(props) {
  // Define variables de estado
  const [dietObject, setDietObject] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
   // Email obtenido de las propiedades
   const correo = props.email
   const edad = props.edad
   const peso = props.peso
   const estatura = props.estatura
   const genero = props.genero

  // Funciones para cambiar las pestañas
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  //Funcion para navegar a cuestioario de Crear Rutina
  function createDiet(){
    navigate("/CreateDiet", {state:{correo:correo, edad:edad, peso:peso, estatura:estatura, genero:genero}}); 
  }
  const handleDeleteDiet = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8888/deleteDiet',{correo:correo}, { headers:{Authorization:`Bearer ${token}`} });
      setDietObject(convertirObjetoAArray(response.data.dieta));
    } catch (error) {
      console.error(error);
    }
  }


  const handlePrevTab = () => {
    setActiveTab((prevTab) => prevTab - 1);
  };

  const handleNextTab = () => {
    setActiveTab((prevTab) => prevTab + 1);
  };

  useEffect(() => {
    // Obtener datos de la API
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8888/dietObject', { correo: correo }, { headers:{Authorization:`Bearer ${token}`} });
        setDietObject(convertirObjetoAArray(response.data.dieta));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

 

  // Función para convertir un objeto en un array
  function convertirObjetoAArray(objeto) {
    const arrayResultante = [];

    for (const diaSemana in objeto) {
      if (objeto.hasOwnProperty(diaSemana)) {
        const tiempos = objeto[diaSemana];
        const dia = {
          dia: diaSemana,
          tiempos: {}
        };

        for (const tiempo in tiempos) {
          if (tiempos.hasOwnProperty(tiempo)) {
            dia.tiempos[tiempo] = tiempos[tiempo];
          }
        }

        arrayResultante.push(dia);
      }
    }

    return arrayResultante;
  }

  // Impresión de dietObject en la consola
  console.log(dietObject);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
              Mis Dietas
            </Typography>
          </Grid>
          <Grid item xs={12}>
          <Button variant="contained" color="secondary" onClick={handleDeleteDiet} disabled={dietObject.length === 0}>
            Delete Diet
          </Button>
          <Button variant="contained" color="primary" onClick={()=>createDiet()} disabled={dietObject.length !== 0}>
            Create Diet
          </Button>
        </Grid>
          <Grid item xs={12} container spacing={2}>
            {dietObject.map((dia, index) => (
              <div key={index} hidden={activeTab !== index} style={{ width: '100%' }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={1}>
                    <IconButton onClick={handlePrevTab} disabled={activeTab === 0}>
                      <ArrowBackIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
                      {dia.dia}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={handleNextTab} disabled={activeTab === dietObject.length - 1}>
                      <ArrowForwardIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid container spacing={2} direction="column">
                  {Object.keys(dia.tiempos).map((tiempo, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <Card sx={{ height: '100%', width: '60%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
                        <CardHeader
                          title={tiempo === "Desayuno" ? tiempo + "🧇" : tiempo === "Almuerzo" ? tiempo + "🍽️" : tiempo + "🍝"}
                          titleTypographyProps={{ align: 'center' }}
                          sx={{ backgroundColor: '#3996D4', color: 'white' }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography align="center" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                            {dia.tiempos[tiempo].nombre || '\u00A0'}
                          </Typography>
                          <Typography align="center" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {dia.tiempos[tiempo].descripcion || '\u00A0'}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}