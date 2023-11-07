import React, { useEffect, useState } from 'react';
import { Grid, Paper, IconButton, Typography } from '@mui/material';
import ClockLoader from "react-spinners/ClockLoader";
import { useRef } from 'react';


export default function RealizarEjercicio(props) {
    const [terminado, setTerminado] = useState(false);
    const [realizando, setRealizando] = useState(true);
    const [contador, setContador] = useState(props.tiempo);
    const [series, setSeries] = useState(props.series);
    const timerId = useRef();
    const seriesId = useRef();
    
    function restartCountdown() {
        setContador(props.tiempo);
        setRealizando(true);
        setTerminado(false);
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
            setTerminado(true);
            setSeries(prev => prev - 1);
        }
    }, [contador, props.tiempo]);

    function finalizar() {
        
    }

    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
            {props.tiempo === 0 ? /*Si el ejercicio es de repeticiones*/ 
                <Grid item>
                    <Paper sx={{ display: 'flex', flexDirection: 'column', height: 60, width: 900, alignItems: 'center', backgroundColor: '#8ad449' }} >
                        <IconButton edge="start" color="inherit" sx={{ width: '100%', height: '100%' }}>
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
                                <IconButton edge="start" color="inherit" sx={{ width: '100%', height: '100%' }}>
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

