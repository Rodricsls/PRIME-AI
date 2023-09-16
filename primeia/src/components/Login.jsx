import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {login} from './Login';
import { Link } from "react-router-dom";

import './styles/Login.css';
import { FitnessCenter, SportsGymnastics } from '@mui/icons-material';


function newPage() {
  return(
    <h1>NUEVA PAGINA</h1>
  )
}

const defaultTheme = createTheme();

export default function App() {

  
  
  const login = () => {
    if(email === "" || password === ""){
      alert("Por favor complete ambos campos");
    }else{
      alert("Su usuario es" + email + " y su contraseña es: " + password);
      <newPage/>
    }
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={8}
            md={7}
            sx={{
              backgroundImage: 'url(https://www.transparentlabs.com/cdn/shop/articles/image4_1200x1200.jpg?v=1604046768)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid className='container'item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Iniciar Sesion 
              </Typography>
              <Box component="form" noValidate onSubmit={login} sx={{ mt: 1 }}>
                <TextField className="input"
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <TextField className='input'
                  margin="normal"
                  required
                  fullWidth
                  label="Contraseña"
                  type="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  
                />
                
                <Button className='button'
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  startIcon={<SportsGymnastics />}
                >
                  Iniciar Sesion
                </Button>
                <Link className='Links' to={"/SignUp"}>
                  <Button className='button'
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2}}
                    startIcon={<FitnessCenter />}
                  >
                    Crear Cuenta
                  </Button>
                </Link>
                
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
  );
}