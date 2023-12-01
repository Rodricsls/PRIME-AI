import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import logo from './logo.png';
import { useLocation } from "react-router-dom";

import './Login.css';


import { FitnessCenter, SportsGymnastics } from '@mui/icons-material';



const defaultTheme = createTheme();


export default function App() {
  //Constantes a utilizar en el componente
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, SetValid]=React.useState(false);
  const navigate = useNavigate(); //navigate utilizado para navegar entre paginas

  const [SnackbarSuccessOpen, setSnackbarSuccessOpen] = React.useState(false);
  const [SnackbarFailOpen, setSnackbarFailOpen] = React.useState(false);
  const [MensajeError, setMensajeError] = useState('');
  const location = useLocation();
 const [isAuthenticated, setIsAuthenticated] = React.useState(false);



  //Funcion para cerrar el snackbar de exito
  const SnackbarSuccessClose = () => {
        setSnackbarSuccessOpen(false);
      };

  //Funcion para cerrar el snackbar de error
  const SnackbarFailClose = () => {
        setSnackbarFailOpen(false);
      };

  const checkTokenLogin = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if(token && email){
      const response = await axios.post('https://primeai.azurewebsites.net/verificarToken', {}, { headers: { Authorization: `Bearer ${token}` } });
      const data= response.data;
      if(data.autenticacion){
        navigate("/Home", {state:{email:email}});
      }
    }
  }

  const autenticacion = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        const response = await axios.post(
          'https://primeai.azurewebsites.net/verificarToken', // Ajusta la ruta según tu servidor
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.autenticacion) {
            setIsAuthenticated(true);
        } else {
            alert("Su sesión ha expirado");

        }
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };


  React.useEffect (() => {
    checkTokenLogin();
  },[]);


  //Funcion para enviar los datos del formulario y hacer Login      
  const handleSubmit = async (event) => {
    event.preventDefault();
    try{  
      const response = await axios.post('https://primeai.azurewebsites.net/login',{correo:email, contraseña:password});
      const data= response.data;
      if(data.autenticacion){
        setSnackbarSuccessOpen(true);
        console.log(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        navigate("/Home", {state:{email:email}}); //navegamos a la pagina Home y enviamos el email para que sea utilizado en las demas paginas
        SetValid(false);
      }else{
        SetValid(true);
      }
    }catch(error){
      setMensajeError('Ha ocurrido un error')
      setSnackbarFailOpen(true);
    }
  };

  return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={12} // 100% width on extra small devices
            sm={8} // 66.66% width on small devices
            md={7} // 58.33% width on medium devices
            sx={{
              backgroundImage: 'url(https://www.transparentlabs.com/cdn/shop/articles/image4_1200x1200.jpg?v=1604046768)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid className='container'item xs={12} sm={4} md={5} component={Paper} elevation={6} square>
            <Box className='Box'
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <img src={logo} alt="Logo-Primeia" border="0" width="250px" height="200px" />
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
          <Snackbar open={SnackbarSuccessOpen} autoHideDuration={6000} onClose={SnackbarSuccessClose}>
              <MuiAlert elevation={6} variant="filled" onClose={SnackbarSuccessClose} severity="success" sx={{ width: '20%', position:'fixed', left:'78%', top:'90%' }}>
                Cuenta Autenticada!
              </MuiAlert>
            </Snackbar>

            <Snackbar open={SnackbarFailOpen} autoHideDuration={6000} onClose={SnackbarFailClose}>
              <MuiAlert elevation={6} variant="filled" onClose={SnackbarFailClose} severity="error" sx={{ width: '20%', position:'fixed', left:'78%', top:'90%' }}>
                {MensajeError}
              </MuiAlert>
            </Snackbar>
      </ThemeProvider>
  );
}