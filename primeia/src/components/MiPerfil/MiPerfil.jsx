import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RowingIcon from '@mui/icons-material/Rowing';
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
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const settings = ['Mi Perfil', 'Cerrar Sesion'];
const paginas = ['Home' , 'Mis Rutinas' , 'Mi Dieta']

export default function MiPerfil(props) {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [Correo2, setCorreo] = useState('');
    const [nombre2, setNombre] = useState('');
    const [apellido2, setApellido] = useState('');
    const [peso2, setPeso] = useState(0);
    const [estatura2, setEstatura] = useState(0);
    const [edad2, setEdad] = useState(0);
    const [imagen_usuario2, setImagenUsuario] = useState('');
    const [ConfirmationOpen, setOpen] = React.useState(false);
    const [SnackbarOpen, setSnackbarOpen] = React.useState(false);





  const SnackbarClose = () => {
      setSnackbarOpen(false);
    };




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    


    

  async function ActualizarDatos(){
        setOpen(false);
        try{
          const response = await axios.post('http://localhost:8888/ActualizarUser',{newCorreo:Correo2, newPeso:peso2, newEstatura:estatura2, oldCorreo:correo});
          const data= response.data;
          
          console.log(data);
          if(data.resultado){
            setSnackbarOpen(true);
          }
        }catch(error){
          alert("Hubo un error", error);
        }
      
    }

    function transferInformation(){
        setCorreo(correo);
        setNombre(nombre);
        setApellido(apellido);
        setPeso(peso);
        setEstatura(estatura);
        setEdad(edad);
        setImagenUsuario(imagen_usuario);
    }
  
  
    const correo =props.email//location.state.email;
    const nombre =props.nombre //location.state.nombre;
    const apellido =props.apellido //location.state.apellido;
    const peso =props.peso //location.state.peso;
    const estatura =props.estatura //location.state.estatura;
    const edad =props.edad //location.state.edad;
    const imagen_usuario =props.imagen_usuario //location.state.imagen_usuario;
  

    useEffect( () => {
      
     transferInformation();
      
    } , [])
  
      
    
  
  
    return (
        
    
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: '#E5FFF7', width:'100%', height:'1300px'}}>
           
            
            <Avatar
                alt={nombre}
                src="/static/images/avatar/1.jpg"
                sx={{ width: 250, height: 250, position:'absolute', top:'10%' , left:'50%'}}
            />

            <Paper elevation={4} 
                sx={{width: 500, height: 600, p: 4, position:'absolute', top:'50%' , left:'40%'}}
            >  
            
                <Typography variant="overline" display="block" color="text.secondary" gutterBottom sx={{position:'absolute', top:'5%' , left:'5%'}}>
                    <FeedIcon /> Informacion Personal
                </Typography>
                 
                 <Typography variant="h6" color="text.secondary" gutterBottom sx={{position:'absolute', top:'15%' , left:'5%'}}>
                    <FaceIcon /> <b>Nombre:</b> {nombre2 + " " +  apellido2}
                </Typography>

                <Typography variant="h6" color="text.secondary" gutterBottom sx={{position:'absolute', top:'32%' , left:'5%'}}>
                    <AccountCircleIcon /> <b>Correo:</b> <TextField id="outlined-basic" label="Actualizar correo" variant="outlined" size="small" defaultValue={correo} 
                                                          onChange={(event) => {
                                                            setCorreo(event.target.value);
                                                          }}/>
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
              
            <Snackbar open={SnackbarOpen} autoHideDuration={6000} onClose={SnackbarClose}>
              <MuiAlert elevation={6} variant="filled" onClose={SnackbarClose} severity="success" sx={{ width: '20%', position:'fixed', left:'78%', top:'90%' }}>
                Datos Actualizados Exitosamente
              </MuiAlert>
            </Snackbar>
              
            
            
            
        
      </Box>

    );
    
    
    }
  
    

  