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
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const settings = ['Mi Perfil', 'Cerrar Sesion'];
const paginas = ['Home' , 'Mis Rutinas' , 'Mi Dieta']

export default function MisRutinas(props) {
    const Hoy = new Date();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [Day, setDay] = React.useState(Hoy.getDay());
    /*const [Lunes, setLunes] = useState(true);
    const [Martes, setMartes] = useState(false);
    const [Miercoles, setMiercoles] = useState(false);
    const [Jueves, setJueves] = useState(false);
    const [Viernes, setViernes] = useState(false);
    const [Sabado, setSabado] = useState(false);
    const [Domingo, setDomingo] = useState(false);*/



  
    

    
    

  

    
  
  
    const correo =props.email//location.state.email;
    const nombre =props.nombre //location.state.nombre;
    const apellido =props.apellido //location.state.apellido;
    const peso =props.peso //location.state.peso;
    const estatura =props.estatura //location.state.estatura;
    const edad =props.edad //location.state.edad;
    const imagen_usuario =props.imagen_usuario //location.state.imagen_usuario;
  

    useEffect( () => {
      
    } , [])

  

    
  
  
    return (
        
    
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: '', width:'100%', height:'1300px'}}>
           
            
           
           <BottomNavigation
                sx={{ position: 'fixed', bottom: 0, left: 100, right: 0,overflowX: 'auto', 
                whiteSpace: 'nowrap',   height: '100px', width:'100%', '& .MuiBottomNavigationAction-label': { fontFamily: 'Arial', fontSize: 20} }} elevation={3}
                showLabels
                value={Day}
                onChange={(event, newDay) => {
                setDay(newDay);
                }}
            >
                {Day == 1 ? <BottomNavigationAction value={1}  sx={{background: 'lightblue', flex: 1 }} label="Lunes"/> : <BottomNavigationAction value={1} sx={{flex: 1 }} label="Lunes"/>}
                {Day == 2 ? <BottomNavigationAction value={2} sx={{background: 'lightblue', flex: 1 }} label="Martes"  /> : <BottomNavigationAction value={2} sx={{ flex: 1 }} label="Martes"  />}
                {Day == 3 ? <BottomNavigationAction value={3} sx={{background: 'lightblue', flex: 1 }} label="Miercoles"/> : <BottomNavigationAction value={3} sx={{ flex: 1 }} label="Miercoles"/>}
                {Day == 4 ?  <BottomNavigationAction value={4} sx={{background: 'lightblue', flex: 1 }} label="Jueves"/> : <BottomNavigationAction value={4} sx={{ flex: 1 }} label="Jueves"/>}
                {Day == 5 ?  <BottomNavigationAction value={5} sx={{background: 'lightblue', flex: 1 }} label="Viernes"/> : <BottomNavigationAction value={5} sx={{ flex: 1 }} label="Viernes"/>}
                {Day == 6 ? <BottomNavigationAction value={6} sx={{background: 'lightblue', flex: 1 }} label="Sabado"/> : <BottomNavigationAction value={6} sx={{ flex: 1 }} label="Sabado"/>}
                {Day == 0 ? <BottomNavigationAction value={0} sx={{background: 'lightblue', flex: 1 }} label="Domingo"/> : <BottomNavigationAction value={0} sx={{ flex: 1 }} label="Domingo"/>}
                
            </BottomNavigation>
            
        
      </Box>

    );
    
    
    }