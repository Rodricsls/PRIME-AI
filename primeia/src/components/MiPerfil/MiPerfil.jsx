import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ScaleIcon from '@mui/icons-material/Scale';
import FeedIcon from '@mui/icons-material/Feed';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import FaceIcon from '@mui/icons-material/Face';
import AssistWalkerIcon from '@mui/icons-material/AssistWalker';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from 'react';


export default function MiPerfil(props) {
    //Constantes a utilizar en el componente
    const [nombre2, setNombre] = useState('');
    const [apellido2, setApellido] = useState('');
    const [peso2, setPeso] = useState(0);
    const [estatura2, setEstatura] = useState(0);
    const [edad2, setEdad] = useState(0);
    const [imagen_usuario2, setImagenUsuario] = useState('prueba.png');
    const [SnackbarSuccessOpen, setSnackbarSuccessOpen] = React.useState(false);
    const [SnackbarFailOpen, setSnackbarFailOpen] = React.useState(false);
    const [MensajeError, setMensajeError] = useState('');
    const [ConfirmationOpen, setOpen] = useState(false);
    //constantes obtenidas por medio de props
    const correo =props.email;
    const nombre =props.nombre;
    const apellido =props.apellido;
    const peso =props.peso;
    const estatura =props.estatura;
    const edad =props.edad;
    const imagen_usuario =props.imagen_usuario;
    //Funcion para abrir el snackbar de exito
    const SnackbarSuccessClose = () => {
      setSnackbarSuccessOpen(false);
    };

    //Funcion para abrir el snackbar de error
    const SnackbarFailClose = () => {
      setSnackbarFailOpen(false);
    };



    //Funcion para abrir el dialogo de confirmacion
    const handleClickOpen = () => {
      setOpen(true);
    };
    //Funcion para cerrar el dialogo de confirmacion
    const handleClose = () => {
      setOpen(false);
    };

    const HandleImageChange = (event) => {
      setImagenUsuario(event.target.files[0].name);
    }

    
    //Funcion para actualizar los datos del usuario
    async function ActualizarDatos(){
          setOpen(false);
          try{
            const response = await axios.post('https://primeai-api.azurewebsites.net/ActualizarUser',{newCorreo:correo, newPeso:peso2, newEstatura:estatura2, newImagen:imagen_usuario2, oldCorreo:correo});
            const data= response.data;
            
            if(data.resultado){
              setSnackbarSuccessOpen(true);
            }
          }catch(error){
            setMensajeError('Algo ha salido mal!');
            setSnackbarFailOpen(true);
          }
        
      }

      //Funcion para convertir los datos constantes del usuario en estados que puedan cambiar
      function transferInformation(){
          setNombre(nombre);
          setApellido(apellido);
          setPeso(peso);
          setEstatura(estatura);
          setEdad(edad);
          setImagenUsuario(imagen_usuario);
      }
  
  
    
  
      //useEffect utilizado para obtener la informacion del usuario al cargar la pagina
      useEffect( () => {
        
      transferInformation();
        
      } , [])
  
      
    
  
  
    return (
        
    
      <Box component="main" sx={{ flexGrow: 1, p: 3, width:'100%', height:'100%'}}>
           
           <Button variant="contained" component="label" sx={{ position:'absolute', top:'23%' , left:'20%'}}>
             Cambiar Imagen
             <input type="file" hidden onChange={HandleImageChange} />
           </Button>
            <Avatar 
                src={require(`../avatars/${imagen_usuario2}`)}
                alt={nombre}
                sx={{ width: 400, height: 400, position:'absolute', top:'30%' , left:'20%'}}
            />
            <Paper elevation={4} 
                sx={{width: 500, height: 600, p: 4, position:'absolute', top:'20%' , left:'50%'}}
            >  
            
                <Typography variant="overline" display="block" color="text.secondary" gutterBottom sx={{position:'absolute', top:'5%' , left:'5%'}}>
                    <FeedIcon /> Informacion Personal
                </Typography>
                 
                 <Typography variant="h6" color="text.secondary" gutterBottom sx={{position:'absolute', top:'15%' , left:'5%'}}>
                    <FaceIcon /> <b>Nombre:</b> {nombre2 + " " +  apellido2}
                </Typography>

                <Typography variant="h6" color="text.secondary" gutterBottom sx={{position:'absolute', top:'32%' , left:'5%'}}>
                    <AccountCircleIcon /> <b>Correo:</b> {correo}
                </Typography>
                
                 <Typography variant="h6" color="text.secondary" gutterBottom sx={{position:'absolute', top:'48%' , left:'5%'}}>
                   <ScaleIcon/> <b>Peso:</b> <TextField id="outlined-basic" label="Actualizar Peso" variant="outlined" size="small" defaultValue={peso} 
                                              onChange={(event) => {
                                                setPeso(event.target.value);
                                              }}/> libras
                </Typography>
                
                 <Typography variant="h6" color="text.secondary" gutterBottom sx={{position:'absolute', top:'68%' , left:'5%'}}>
                    <AccessibilityNewIcon/> <b>Estatura:</b> <TextField id="outlined-basic" label="Actualizar estatura" variant="outlined" size="small" defaultValue={estatura} 
                                                               onChange={(event) => {
                                                                setEstatura(event.target.value);
                                                              }}/> cm
                </Typography>
                
                 <Typography variant="h6" color="text.secondary" gutterBottom sx={{position:'absolute', top:'80%' , left:'5%'}}>
                    <AssistWalkerIcon/> <b>Edad:</b> {edad2}
                </Typography>

                <Button variant="contained" sx={{position:'absolute', top:'90%' , left:'65%'}} onClick={handleClickOpen}>Actualizar Datos</Button>

                <Dialog
                  open={ConfirmationOpen}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Esta seguro que desea cambiar su informacion?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Tome en cuenta que si cambia su correo electronico, debe iniciar sesion con su nuevo correo!
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={() => ActualizarDatos()} autoFocus>
                      Confirmar
                    </Button>
                  </DialogActions>
                </Dialog>

            
            </Paper>
              
            <Snackbar open={SnackbarSuccessOpen} autoHideDuration={6000} onClose={SnackbarSuccessClose}>
              <MuiAlert elevation={6} variant="filled" onClose={SnackbarSuccessClose} severity="success" sx={{ width: '20%', position:'fixed', left:'78%', top:'90%' }}>
                Datos Actualizados exitosamente!
              </MuiAlert>
            </Snackbar>

            <Snackbar open={SnackbarFailOpen} autoHideDuration={6000} onClose={SnackbarFailClose}>
              <MuiAlert elevation={6} variant="filled" onClose={SnackbarFailClose} severity="error" sx={{ width: '20%', position:'fixed', left:'78%', top:'90%' }}>
                {MensajeError}
              </MuiAlert>
            </Snackbar>
              
            
            
            
        
      </Box>

    );
    
    
    }
  
    

  