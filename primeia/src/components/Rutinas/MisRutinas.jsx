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

export default function MisRutinas(props) {
    //Constantes a utilizar en el componente
    const Hoy = new Date();
    const location = useLocation();
    const navigate = useNavigate();
    const [Day, setDay] = React.useState(Hoy.getDay());//Obtenemos que dia es hoy
    console.log(Day);
    
    // Informacion de rutina para cada dia
    const [rutinaLunes, setRutinaLunes] = useState([]);
    const [rutinaMartes, setRutinaMartes] = useState([]);
    const [rutinaMiercoles, setRutinaMiercoles] = useState([]);
    const [rutinaJueves, setRutinaJueves] = useState([]);
    const [rutinaViernes, setRutinaViernes] = useState([]);
    const [rutinaSabado, setRutinaSabado] = useState([]);
    const [rutinaDomingo, setRutinaDomingo] = useState([]);
    const [NombreRutina, setNombreRutina] = useState('');
    //obtenemos el correo de los props
    const correo =props.email
    
    //Funcion para cambiar de dia de rutina
    function changeDay(day){
        setDay(day);
    }
  

    useEffect( () => {
      
    } , [])

  

    
  
  
    return (
        
    
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: '', width:'100%', height:'1300px'}}>
           
            
           
           <BottomNavigation
                sx={{ position: 'fixed', bottom: 0, left: 100, right: 0,overflowX: 'auto', 
                whiteSpace: 'nowrap',   height: '100px', width:'100%', '& .MuiBottomNavigationAction-label': { fontFamily: 'Arial', fontSize: 20} }} elevation={3}
                showLabels
                value={Day}
                onChange={(event, newDay) => changeDay(newDay)}
            >
                {Day === 1 ? <BottomNavigationAction value={1}  sx={{background: 'lightblue', flex: 1 }} label="Lunes"/> : <BottomNavigationAction value={1} sx={{flex: 1 }} label="Lunes"/>}
                {Day === 2 ? <BottomNavigationAction value={2} sx={{background: 'lightblue', flex: 1 }} label="Martes"  /> : <BottomNavigationAction value={2} sx={{ flex: 1 }} label="Martes"  />}
                {Day === 3 ? <BottomNavigationAction value={3} sx={{background: 'lightblue', flex: 1 }} label="Miercoles"/> : <BottomNavigationAction value={3} sx={{ flex: 1 }} label="Miercoles"/>}
                {Day === 4 ?  <BottomNavigationAction value={4} sx={{background: 'lightblue', flex: 1 }} label="Jueves"/> : <BottomNavigationAction value={4} sx={{ flex: 1 }} label="Jueves"/>}
                {Day === 5 ?  <BottomNavigationAction value={5} sx={{background: 'lightblue', flex: 1 }} label="Viernes"/> : <BottomNavigationAction value={5} sx={{ flex: 1 }} label="Viernes"/>}
                {Day === 6 ? <BottomNavigationAction value={6} sx={{background: 'lightblue', flex: 1 }} label="Sabado"/> : <BottomNavigationAction value={6} sx={{ flex: 1 }} label="Sabado"/>}
                {Day === 0 ? <BottomNavigationAction value={0} sx={{background: 'lightblue', flex: 1 }} label="Domingo"/> : <BottomNavigationAction value={0} sx={{ flex: 1 }} label="Domingo"/>}
                
            </BottomNavigation>
            
        
      </Box>

    );
    
    
    }