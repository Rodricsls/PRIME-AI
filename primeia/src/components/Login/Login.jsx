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
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import './Login.css';


import { FitnessCenter, SportsGymnastics } from '@mui/icons-material';

function newPage() {
  return(
    <h1>NUEVA PAGINA</h1>
  )
}

const defaultTheme = createTheme();

export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, SetValid]=React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{  
      const response = await axios.post('http://localhost:8888/login',{correo:email, contraseña:password});
      const data= response.data;
      //console.log(data);
      if(data.autenticacion){
        alert('Usuario autenticado');
        navigate("/Home", {state:{email:email}});
        SetValid(false);
      }else{
        SetValid(true);
      }
    }catch(error){
      alert("Hubo un error", error);
    }
  };

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
            <Box className='Box'
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#3996D4' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Iniciar Sesion 
              </Typography>
              <Box className='Box' component="form" noValidate  sx={{ mt: 1 }}>
                <TextField className='TexField'
                  margin="normal"
                  required
                  fullWidth
                  sx={{borderColor:'#3996D4'}}
                  label="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <TextField className='TextField'
                  margin="normal"
                  required
                  fullWidth
                  label="Contraseña"
                  type="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <div style={{ display: valid ? 'block' : 'none', color: 'red' }}>
                      Los datos Ingresados no son Correctos Intenta de nuevo.
                  </div>
                
                <Button className='Button'
                  id='Button'
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2}}
                  onClick={handleSubmit}
                  startIcon={<SportsGymnastics />}
                >
                  Iniciar Sesion
                </Button>
                <Link className='Links' to={"/SignUp"}>
                  <Button className="Button"
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