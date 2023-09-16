import * as React from 'react'
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import './styles/SignUp.css'
import { EmojiEventsSharp } from '@mui/icons-material';

//Función de Copyrigth

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Prime IA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const defaultTheme = createTheme();

//Función principal

export default function SignUp() {
   //Estados necesarios para esta sección
  const[name, setName]=React.useState('');
  const[apellido, setApellido]=React.useState('');
  const[email, setEmail]=React.useState('');
  const [password, setPassword]=React.useState('');
  const [confirmpassword, setConfirmpassword]=React.useState('');
  const [showPassword, setShowPassword]=React.useState(false);
  const [allRequirementsMet, setAllRequirementsMet]=React.useState(false);

  const user={correo:email,
              contraseña:password,
              nombre:name,
              apellido:apellido,
              peso:128,
              estatura: 178,
              id_dieta:34};/* Esto debe y va a cambiar cuando pasemos al cuestionario de preguntas */

  //Expresiones regulares para la contraseña
  const requirements = React.useMemo(() => [

      { regex: /.{8,}/, text:'Mínimo 8 caracteres '},
      { regex: /[0-9]/, text:'Mínimo 1 número  '},
      { regex: /[a-z]/, text:'Mínimo 1 letra en minuscula '},
      { regex: /[^A-Za-z0-9]/, text:'Mínimo 1 caracter especial (!...@) '},
      { regex: /[A-Z]/, text:'Mínimo 1 letra en mayúscula '},
      ], []);


  //Todos los eventHandlers de sus respectivos campos
  const handlePassword=(event)=>{
    setPassword(event.target.value);
  };

  const handleName=(event) => {
    setName(event.target.value);
  };

  const handleEmail=(event) => {
    setEmail(event.target.value);
  };

  const handleApellido=(event) => {
    setApellido(event.target.value);
  };

  const handleConfirmPassword=(event)=>{
    setConfirmpassword(event.target.value);
  };

  const togglePasswordVisibility = () =>{
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch('http://localhost:8888/signup',{
    method: 'POST',
    body: JSON.stringify(user),
    headers:{"Content-Type": "application/json"}
    })
    alert("Se ingreso el usaurio correctamente");
  };


  //Chequea que la contraseña y la confirmación sean iguales
  const coincidence=(password && password !== confirmpassword);
       
  const warning_text=(()=>{
      if(coincidence){
          return "Las contraseñas no coinciden";
      }
  });

  const warning=warning_text();

  const passwordcheck_value= ()=>{
      if(password==confirmpassword){
          return true
      }else{
          return false
      }
  }

  const passwordcheck=passwordcheck_value();

  //efecto para validar las expresiones regulares
  React.useEffect(()=>{
      const allMet = requirements.every((req) => req.regex.test(password));
      setAllRequirementsMet(allMet);
  }, [password, requirements]);
   
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />


        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#3996D4' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <div className='datos'>
              <TextField className='nombres'
                    margin="normal"
                    required
                    fullWidth
                    id="Fname"
                    label="First Name"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleName}
                />
                <TextField className='apellidos'
                    margin="normal"
                    required
                    fullWidth
                    id="Lname"
                    label="Last Name"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleApellido}
                />
              </div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleEmail}
              />
              <div>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                type={showPassword ? 'text':'password'}
                value={password}
                onChange={handlePassword}
              />
              <i className={`fa-solid faEye${showPassword ? 'faEyeSlash' : ''}`} onClick={togglePasswordVisibility}></i>

              </div>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="Cpassword"
                autoComplete="current-password"
                value={confirmpassword}
                onChange={handleConfirmPassword}
              />

                <Grid container>
                    <Grid item>
                    <div class="warning">
                        {warning}
                    </div>
                    <div className='content' >
                        <span>La contraseña debe contener: </span>
                        <ul className='requirement-list'>
                            {requirements.map((req, index) => (

                                <li key={index} className={req.regex.test(password) ? 'valid': ''}>

                                    <i className={`fa fa-solid ${req.regex.test(password) ? 'fa-check' : 'fa-circle'}`}></i>
                                    <span>{req.text}</span>

                                </li>

                            ))}
                        </ul>

                    </div>
                    </Grid>
                </Grid>
              
              <Button
                className='SignUp'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!allRequirementsMet || !passwordcheck}
                startIcon={<EmojiEventsSharp/>}
                
              >
                
                Sign Up
              </Button>
              
              <Copyright sx={{ mt: 5 }} />
            </Box>

          </Box>
        </Grid>

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
    );
}