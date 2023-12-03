import React, { useEffect, useState } from 'react';
import { Grid, Paper, IconButton, Typography } from '@mui/material';
import ClockLoader from "react-spinners/ClockLoader";
import { useRef } from 'react';
import axios from 'axios';


export default function RealizarEjercicio(props) {
    const [realizando, setRealizando] = useState(true);
    const [contador, setContador] = useState(props.tiempo);
    const [series, setSeries] = useState(props.series);
    const timerId = useRef();
    const correo = props.correo;
    const id_rutina = props.id_rutina;
    const id_ejercicio = props.ejercicio.id_ejercicio;
    const dia = props.dia;

    function restartCountdown() {
        setContador(props.tiempo);
        setRealizando(true);
        clearInterval(timerId.current);
        timerId.current = setInterval(() => {
            setContador(prev => prev - 1);
        }, 1000);
    }

    useEffect(() => {
        timerId.current = setInterval(() => {
            setContador(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timerId.current);
    }, []);

    useEffect(() => {
        if (contador === 0) {
            clearInterval(timerId.current);
            setRealizando(false);
            setSeries(prev => prev - 1);
        }
    }, [contador, props.tiempo]);

    async function finalizar() {
        let diaEjercicio = '';
        if(dia === 1){
            diaEjercicio = 'Lunes';
        }else if(dia === 2){
            diaEjercicio = 'Martes';
        }else if(dia === 3){
            diaEjercicio = 'Miércoles';
        }else if(dia === 4){
            diaEjercicio = 'Jueves';
        }else if(dia === 5){
            diaEjercicio = 'Viernes';
        }else if(dia === 6){
            diaEjercicio = 'Sábado';
        }else if(dia === 0){
            diaEjercicio = 'Domingo';
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://primeai-api.azurewebsites.net/FinishEjercicio', {id_rutina : id_rutina, id_ejercicio: id_ejercicio, dia : diaEjercicio, correo: correo }, { headers: { Authorization: `Bearer ${token}` } });
            const data= response.data;
            if(data.status === 1){
                props.setEjerciciosPage(true);
                props.setRealizarEjerciciosPage(false);
            }
            
          } catch (error) {
            console.error(error);
          }

    }

    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
            <Grid item xs={12}>
            </Grid>
            {props.tiempo === 0 ? /*Si el ejercicio es de repeticiones*/ 
                <Grid item>
                    <Paper sx={{ display: 'flex', flexDirection: 'column', height: 60, width: 900, alignItems: 'center', backgroundColor: '#8ad449' }} >
                        <IconButton edge="start" color="inherit" sx={{ width: '100%', height: '100%' }} onClick={() => finalizar()}>
                            <Typography component="h1" variant="h6" color="white" noWrap sx={{ flexGrow: 1 }}>
                                Finalizar
                            </Typography>
                        </IconButton>
                    </Paper>
                </Grid>
            :   /*Si el ejercicio es de tiempo*/


                <Grid item>
                        <ClockLoader
                            color={'#38e999'}
                            loading={realizando}
                            size={500}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        <Typography align="center" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'black' }}>
                            {"Series Restantes: " + series}  
                        </Typography>
                        <Typography align="center" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'black' }}>
                            {"Tiempo Restante: " + contador + " segundos"}  
                        </Typography>
                        {contador === 0 && series === 0 ? /*Si ya termino todas las series*/
                            <Paper sx={{ display: 'flex', flexDirection: 'column', height: 60, width: 900, alignItems: 'center', backgroundColor: '#8ad449' }} >
                                <IconButton edge="start" color="inherit" sx={{ width: '100%', height: '100%' }} onClick={() => finalizar()}>
                                    <Typography component="h1" variant="h6" color="white" noWrap sx={{ flexGrow: 1 }}>
                                        Finalizar
                                    </Typography>
                                </IconButton>
                            </Paper>
                        :''}

                        {contador === 0 && series > 0? //Si solo ha terminado una serie
                            <Paper sx={{ display: 'flex', flexDirection: 'column', height: 60, width: 900, alignItems: 'center', backgroundColor: '#8ad449' }} >
                                <IconButton edge="start" color="inherit" sx={{ width: '100%', height: '100%' }} onClick={ () => restartCountdown()}>
                                    <Typography component="h1" variant="h6" color="white" noWrap sx={{ flexGrow: 1 }}>
                                        Siguiente serie
                                    </Typography>
                                </IconButton>
                            </Paper>
                        : ''}
                </Grid>
            }
            
        </Grid>
    );
}

