import * as React from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import './SignUp.css';
import { EmojiEventsSharp } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import logo from './logo.png';
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
  const [valid, SetValid]=React.useState(false);

  //Navigate funciona para moverse entre componentes de react-router
  const navigate = useNavigate();

  const user={correo:email,
              contraseña:password,
              nombre:name,
              apellido:apellido,
              peso:128,
              estatura: 178,
              imagen_usario:"img",
              edad:22};/* Esto debe y va a cambiar cuando pasemos al cuestionario de preguntas */

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

 
  


  //Chequea que la contraseña y la confirmación sean iguales
  const coincidence=(password && password !== confirmpassword);
       
  const warning_text=(()=>{
      if(coincidence){
          return "Las contraseñas no coinciden";
      }
  });

  const warning=warning_text();
  

  const passwordcheck_value= ()=>{
      if(password===confirmpassword){
          return true
      }else{
          return false
      }
  }

  //Funcion para moverse al cuestionario
  function Registrar(){
    navigate("/Cuestionario", {state:{Nombre:name, Apellido:apellido ,Email:email, Password:password, ConfirmedPassword:confirmpassword}});
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


        <Grid className='container' item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box className='Box'
            sx={{
              my: 5,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <img src={logo} alt="Logo-Primeia" border="0" width="250px" height="200px" />
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            <Box className='Box' component="form" noValidate sx={{ mt: 0 }}>
              <div className='datos'> 
              <TextField className='nombres'
                    color='success'
                    margin="normal"
                    required
                    fullWidth
                    id="Fname"
                    label="First Name"
                    name="First Name"
                    autoComplete="name"
                    autoFocus
                    onChange={handleName}
                />
                <TextField className='apellidos'
                    margin="normal"
                    color='success'
                    required
                    fullWidth
                    id="Lname"
                    label="Last Name"
                    name="Last Name"
                    autoComplete="name"
                    autoFocus
                    onChange={handleApellido}
                />
              </div>
              <TextField
                color='success'
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
                color='success'
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
                color='success'
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
                    <div className="warning">
                        {warning}
                    </div>
                    <div style={{ display: valid ? 'block' : 'none', color: 'red' }}>
                      Este usuario ya existe.
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
                      sx={{ mt: 2, mb: 2}}
                      disabled={!allRequirementsMet || !passwordcheck}
                      startIcon={<EmojiEventsSharp/>}
                      onClick={() => Registrar()}
                    >
                      Registrar
                    </Button>
                
                    
                
                  <Copyright sx={{ mt: 0 }} />
            </Box>

          </Box>
        </Grid>

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://sogetfitessex.co.uk/wp-content/uploads/revslider/fitness-slider-3-animated/5-layers.jpg)',
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