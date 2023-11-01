import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import RowingIcon from '@mui/icons-material/Rowing';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import MiPerfil from '../MiPerfil/MiPerfil';
import MisRutinas from '../Rutinas/MisRutinas';  
import MisDietas from '../Dietas/MisDietas';
import axios from 'axios';
import { Grid, Paper } from '@mui/material';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import './Home.css'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import logo from './logo.png';

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const drawerWidth = 240; //ancho del drawer
const settings = ['Mi Perfil', 'Cerrar Sesion']; //opciones del menu de usuario
const paginas = ['Home' , 'Mis Rutinas' , 'Mi Dieta'] //opciones del drawer

//Estilos del AppBar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//Estilos del Drawer
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })((
  { theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },

}));


const defaultTheme = createTheme();

export default function Home() {
  //Constantes a utilizar en el componente
  const [open, setOpen] = React.useState(false);
  const [HomePage, setHomePage] = useState(true);
  const [MyProfilePage, setMyProfilePage] = useState(false);
  const [RutinasPage, setRutinasPage] = useState(false);
  const [DietasPage, setDietasPage] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation(); //location utilizado para obtener el correo del usuario proveniente del login
  const navigate = useNavigate(); //navigate utilizado para navegar entre paginas
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [peso, setPeso] = useState(0);
  const [estatura, setEstatura] = useState(0);
  const [edad, setEdad] = useState(0);
  const [imagen_usuario, setImagenUsuario] = useState('');
  const correo =location.state.email;
  
 

  //Funcion para obtener la informacion del usuario
  async function getData(Email){
    try{
      //console.log(Email);
      const response = await axios.post('http://localhost:8888/user',{correo:Email});
      const data = response.data;
      console.log(data);
      if(data.resultado){
        setNombre(data.nombre);
        setApellido(data.apellido);
        setPeso(data.peso);
        setEstatura(data.estatura);
        setEdad(data.edad);
        setImagenUsuario(data.imagen_usuario);
      }else{
        alert(data.mensaje);
      }
      } catch (error) {
        console.log(error.response)
      }
  }

  //useEffect utilizado para obtener la informacion del usuario al cargar la pagina
  useEffect( () => {
    
    getData(correo); 
    
  } , [])

    //Funcion para abrir el menu de usuario
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    }; 
    //Funcion para cerrar el menu de usuario
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    //Funcion para abrir el drawer
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const [selectedTab, setSelectedTab] = useState(0);

const handleTabChange = (event, newValue) => {
  setSelectedTab(newValue);
};

    //Funcion para manejar las opciones del menu de usuario
    function handleProfileOptions(option) {
          if(option === "Mi Perfil"){
            setMyProfilePage(true);
            setHomePage(false);
            setRutinasPage(false);
            setDietasPage(false);
            setAnchorElUser(null);
          }else if(option === "Cerrar Sesion"){
            navigate('/'); //navegamos a la pagina de login
          }
        
    }

    //Funcion para manejar las opciones del drawer
    function NavigationSelect(pagina){
        if(pagina === "Home"){
          setMyProfilePage(false);
          setHomePage(true);
          setRutinasPage(false);
          setDietasPage(false);

        }else if(pagina === "Mis Rutinas"){
          setMyProfilePage(false);
          setHomePage(false);
          setRutinasPage(true);
          setDietasPage(false);
        }else if(pagina === "Mi Dieta"){
          setMyProfilePage(false);
          setHomePage(false);
          setRutinasPage(false);
          setDietasPage(true);
        }
    }

    
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />      
          <AppBar className='var' position="absolute" open={open}>
              <Toolbar sx={{pr:'24px',}}>
                <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{marginRight:'36px', ...(open && {display:'none'})}}>
                    <MenuIcon />
                </IconButton> 
                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>  
                   Hola, {nombre} {apellido}!
                </Typography> 

                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                      <Avatar sx={{backgroundColor:'#6dbf26'}} alt={nombre} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleProfileOptions(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
                </Menu>
              </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar sx={{display:'flex', alignItems:'center', justifyContent:'space', px:[0]}}>
                <img src={logo} alt="Logo-Primeia" border="0" width="170px" height="100px"/>
              <div sx={{flexGrow:1, display:'flex', width:'100%', height:'100%'}}>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
              </div>
            </Toolbar>

            <List component="nav">
              {paginas.map((key, index) => (
                <ListItemButton key={index} onClick={() => NavigationSelect(key)} sx={{ height: '90px' }}>
                  <ListItemIcon sx={{ textAlign: 'center' }}>
                    {index === 0 ? <HomeIcon sx={{ color: '#3996D4', textAlign: 'center' }} /> : ''}
                    {index === 1 ? <FitnessCenterIcon sx={{ color: '#3996D4' }} /> : ''}
                    {index === 2 ? <RestaurantMenuIcon sx={{ color: '#3996D4' }} /> : ''}
                  </ListItemIcon>
                  <ListItemText primary={key} />
                </ListItemButton>
              ))}
            </List>
          </Drawer>
          <Box component="main" sx={{ backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, height: '100vh', overflow: 'auto' }}>
            <Toolbar/>
            <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
                {HomePage ? <Grid container spacing={5}>
                  {/* Rachas */}
                  <Grid item xs={14} md={8} lg={9}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 280,alignItems:'center' }}>
                      <Typography component="h1" variant="h6" color="#3996D4" noWrap sx={{ flexGrow: 1 }}>  
                        RACHA 
                      </Typography> 
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4} lg={3}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 280,alignItems:'center' }}>
                      <Typography component="h1" variant="h6" color="#3996D4" noWrap sx={{ flexGrow: 1 }}>  
                        PROGRESO DIARIO 
                      </Typography> 
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 280, alignItems:'center' }}>
                      <Typography component="h1" variant="h6" color="#3996D4" noWrap sx={{ flexGrow: 1 }}>  
                        PROGRESO SEMANAL 
                      </Typography> 
                    </Paper>
                  </Grid>
                </Grid>:''}

            </Container>
            {RutinasPage ? <MisRutinas email={correo} open={open} /> : ''}
            {DietasPage ? <MisDietas email={correo} open={open} /> : ''}
          </Box>
            
            
            {/* {MyProfilePage ? <MiPerfil email={correo} nombre = {nombre} apellido = {apellido} peso = {peso} estatura ={estatura} edad = {edad} imagen_usuario = {imagen_usuario} />: ''}
            {RutinasPage ? <MisRutinas email={correo} /> : ''}
            {DietasPage ? <MisDietas email={correo} /> : ''} */}
      </Box>
    </ThemeProvider>
  );
}