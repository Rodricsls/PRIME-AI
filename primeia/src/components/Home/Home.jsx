import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
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
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RowingIcon from '@mui/icons-material/Rowing';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import MiPerfil from '../MiPerfil/MiPerfil';
import MisRutinas from '../Rutinas/MisRutinas';  
import MisDietas from '../Dietas/MisDietas';

const drawerWidth = 240; //ancho del drawer
const settings = ['Mi Perfil', 'Cerrar Sesion']; //opciones del menu de usuario
const paginas = ['Home' , 'Mis Rutinas' , 'Mi Dieta'] //opciones del drawer

export default function Home() {
  //Constantes a utilizar en el componente
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      
      <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1 , background: 'linear-gradient(to right bottom, #3996D4, #21457F)' }}>
        <Container maxWidth="xl" >
            <Toolbar disableGutters>
            <AdbIcon sx={{ position: 'fixed', top:'2%', left:'2%'}} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                position: 'fixed', top:'1.5%', left:'3.5%',
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                PRIME AI
            </Typography>

            

            

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ position: 'fixed', top:'0%', right:'2%' }}>
                    <Avatar alt={nombre} src="/static/images/avatar/2.jpg" />
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
            </Box>
            </Toolbar>
        </Container>
      </AppBar>


      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', height : '100%' , background : '#EAF1F8'}}>
          <List>
            {paginas.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => NavigationSelect(text)}>
                  <ListItemIcon>
                    {index === 0 ? <HomeIcon /> : '' }
                    {index === 1 ? <RowingIcon /> : ''}
                    {index === 2 ? <RestaurantMenuIcon /> : ''}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
              
        
           
             
              {MyProfilePage ? <MiPerfil email={correo} nombre = {nombre} apellido = {apellido} peso = {peso} estatura ={estatura} edad = {edad} imagen_usuario = {imagen_usuario} />: ''}
              {RutinasPage ? <MisRutinas email={correo} /> : ''}
              {DietasPage ? <MisDietas email={correo} /> : ''}
            
            
        
      
    </Box>
  );
}