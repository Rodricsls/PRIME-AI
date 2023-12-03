import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import { CardHeader } from '@mui/material';
import axios from 'axios';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import RealizarEjercicio from './RealizarEjercicio';




function MisEjercicios(props) {
    const [ejercicios, setEjercicios] = useState([]);
    const [ejerciciosPage, setEjerciciosPage] = useState(true); //Si es true, se muestra la pagina de ejercicios, si es false, se muestra la pagina de realizar ejercicio
    const [RealizarEjercicioPage, setRealizarEjercicioPage] = useState(false);
    const [series, setSeries] = useState(0);
    const [repeticiones, setRepeticiones] = useState(0);
    const [tiempo, setTiempo] = useState(0);
    const [ejercicioActual, setEjercicioActual] = useState({});
    const [nombreEjercicio, setNombreEjercicio] = useState('');
    const correo = props.email;
    const dia = props.dia;
    const id_rutina = props.dayRoutine[0].idr;
    useEffect(() => {
        setEjercicios(props.dayRoutine[0].ejercicios);
    }, []);

    

    function startEjercicio(ejercicio) {
        setSeries(ejercicio.series);
        setRepeticiones(ejercicio.repeticiones);
        setTiempo(ejercicio.tiempo_ejercicio);
        setNombreEjercicio(ejercicio.nombre_ejercicio);
        setEjercicioActual(ejercicio);
        setEjerciciosPage(false); 
        setRealizarEjercicioPage(true);
    }

    return (
        
            <Box sx={{ flexGrow: 1 }}>
                {ejerciciosPage ? 
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
                                    Mis Ejercicios
                                </Typography>
                            </Grid>
                            <Grid item xs={12} container spacing={2} sx={{paddingBottom : 10}}>
                                <div  style={{ width: '100%' }}>
                                    {ejercicios.map((ejercicio, index) => (
                                        <Grid key={ejercicio.id_ejercicio}   container spacing={2} direction="column">
                                            <Grid item xs={12} md={6} lg={4} key={index}>
                                                <Card sx={{ height: '100%', width: '50%', margin: '0 auto', display: 'flex', flexDirection: 'column', marginBottom: '1cm' }}>
                                                    <CardHeader
                                                    title={ejercicio.nombre_ejercicio}
                                                    titleTypographyProps={{ align: 'center' }}
                                                    sx={{ backgroundColor: '#86BE54', color: 'white' }}
                                                    />
                                                    <CardContent sx={{ flexGrow: 1 }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="300"
                                                        image={ejercicio.imagen_ejercicio === '#' ? 'https://img.freepik.com/vector-premium/lindo-hombre-levantando-mancuernas-fitness-gym-dibujos-animados-vector-icono-ilustracion-icono-deporte-personas-aislado_138676-5450.jpg?w=826' : require(`./Eimg/${ejercicio.imagen_ejercicio}`)}
                                                        alt={ejercicio.nombre_ejercicio}
                                                    />
                                                    <Typography align="center" sx={{ fontSize: '1.2rem',  }}>
                                                        { ejercicio.musculo || '\u00A0'}
                                                    </Typography>
                                                    {ejercicio.tiempo_ejercicio === 0 ?
                                                        <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', height: 45, alignItems: 'center'}}>
                                                            <IconButton disabled sx={{ width: '100%', height: '100%' }}>
                                                                <ReplayCircleFilledIcon sx={{ fontSize: 28, color:'black' }} />
                                                                <Typography align="center" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'black' }}>
                                                                    {ejercicio.series + ' series' + '/' + ejercicio.repeticiones + ' repeticiones'}
                                                                </Typography>
                                                            </IconButton>
                                                        </Paper>
                                                        
                                                    : 
                                                    <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', height: 45, alignItems: 'center'}}>
                                                        <IconButton disabled sx={{ width: '100%', height: '100%' }}>
                                                            <AccessTimeIcon sx={{ fontSize: 28, color:'black' }} />
                                                            <Typography align="center" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'black' }}>
                                                            {ejercicio.series + ' series' + '/' + ejercicio.tiempo_ejercicio + ' segundos'}
                                                            </Typography>
                                                        </IconButton>
                                                    </Paper>
                                                        
                                                    }
                                                    {ejercicio.completado === 'si' ? /*Si el ejercicio ya fue completado*/ 
                                                        <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'column', height: 45, alignItems: 'center', borderColor: 'green', }}>
                                                            <IconButton disabled  color="inherit" sx={{ width: '30%', height: '100%' }}>
                                                                <Typography component="h1" variant="h6" color="green" noWrap sx={{ flexGrow: 1 }}>
                                                                    Completado
                                                                </Typography>
                                                                <CheckCircleOutlineIcon color='success' sx={{ fontSize: 30 }} />
                                                            </IconButton>
                                                        </Paper>
                                                    : ''}

                                                    {ejercicio.completado === 'no' ? /*Si el ejercicio no fue completado*/
                                                        <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'column', height: 45, alignItems: 'center', borderColor: 'red', }}>
                                                            <IconButton disabled  color="inherit" sx={{ width: '100%', height: '100%' }}>
                                                                <Typography component="h1" variant="h6" color="red" noWrap sx={{ flexGrow: 1 }}>
                                                                    No realizaste el ejercicio! vuelve la proxima semana
                                                                </Typography>
                                                                <CancelIcon color='error' sx={{ fontSize: 30 }} />
                                                            </IconButton>
                                                        </Paper>
                                                    : ''}

                                                    {ejercicio.completado === 'aun' ? /*Si el ejercicio no se debe realizar hoy*/
                                                        <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'column', height: 45, alignItems: 'center', borderColor: 'gray', }}>
                                                            <IconButton disabled  color="inherit" sx={{ width: '75%', height: '100%' }}>
                                                                <Typography component="h1" variant="h6" color="gray" noWrap sx={{ flexGrow: 1 }}>
                                                                    Aún no debes realizar este ejercicio
                                                                </Typography>
                                                                <AccessTimeIcon color='disabled' sx={{ fontSize: 30 }} />
                                                            </IconButton>
                                                        </Paper>
                                                    : ''}

                                                    {ejercicio.completado === 'hoy' ? /*Si el ejercicio debe realizarse hoy*/
                                                        <Paper sx={{ display: 'flex', flexDirection: 'column', height: 45, alignItems: 'center', backgroundColor: '#21457F' }}>
                                                            <IconButton onClick={() => startEjercicio(ejercicio)} color="inherit" sx={{ width: '75%', height: '100%' }}>
                                                                <Typography component="h1" variant="h6" color="white" noWrap sx={{ flexGrow: 1 }}>
                                                                    Comenzar
                                                                </Typography>
                                                            </IconButton>
                                                        </Paper>
                                                    : ''}


                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    ))}
                                    </div>
                                
                            </Grid>
                        </Grid>
                    </Container>
                : ''}
            {RealizarEjercicioPage ? <RealizarEjercicio series ={series} repeticiones = {repeticiones} tiempo = {tiempo} ejercicio = {ejercicioActual} correo = {correo} nombreEjercicio = {nombreEjercicio}
                                    dia = {dia} id_rutina = {id_rutina} setEjerciciosPage = {setEjerciciosPage} setRealizarEjercicioPage = {setRealizarEjercicioPage} /> : ''}

            </Box>
    );
}

export default MisEjercicios;
