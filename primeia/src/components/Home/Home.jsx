import React from 'react'; // Importaciones de React y Component
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'; // Importaciones de Material-UI
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import MiPerfil from '../MiPerfil/MiPerfil';
import MisRutinas from '../Rutinas/MisRutinas';
import MisDietas from '../Dietas/MisDietas';
import axios from 'axios';
import { Grid, Paper } from '@mui/material';
import './Home.css'
import logo from './logo.png';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RadialBar from '../charts/charts';
import BarChart from '../charts/barchart';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const drawerWidth = 240; // Ancho del drawer
const settings = ['Mi Perfil', 'Cerrar Sesion']; // Opciones del menú de usuario
const paginas = ['Home', 'Mis Rutinas', 'Mi Dieta'] // Opciones del drawer

// Estilos del AppBar
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

// Estilos del Drawer
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
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

const defaultTheme = createTheme(); // Tema por defecto

export default function Home() {
  // Constantes a utilizar en el componente
  const [open, setOpen] = React.useState(false); // Estado para el drawer
  const [HomePage, setHomePage] = useState(true); // Estado para la página de inicio
  const [MyProfilePage, setMyProfilePage] = useState(false); // Estado para la página de perfil
  const [RutinasPage, setRutinasPage] = useState(false); // Estado para la página de rutinas
  const [DietasPage, setDietasPage] = useState(false); // Estado para la página de dietas
  const [anchorElUser, setAnchorElUser] = React.useState(null); // Estado para el menú de usuario
  const location = useLocation(); // location utilizado para obtener el correo del usuario proveniente del login
  const navigate = useNavigate(); // navigate utilizado para navegar entre páginas
  const [nombre, setNombre] = useState(''); // Estado para el nombre del usuario
  const [apellido, setApellido] = useState(''); // Estado para el apellido del usuario
  const [peso, setPeso] = useState(0); // Estado para el peso del usuario
  const [estatura, setEstatura] = useState(0); // Estado para la estatura del usuario
  const [edad, setEdad] = useState(0); // Estado para la edad del usuario
  const [imagen_usuario, setImagenUsuario] = useState('prueba.png'); // Estado para la imagen de usuario
  const [dayProgress, setDayProgress] = useState(0); // Estado para el progreso del día
  const correo = location.state.email; // Correo del usuario obtenido de location
  const Hoy = new Date();
  const [Day, setDay] = React.useState(Hoy.getDay()); // Obtenemos que día es hoy
  const [Racha, setRacha] = useState(0); // Estado para la racha del usuario
  const [diasRacha, setDiasRacha] = useState({
    Domingo: 'aun',
    Lunes: 'aun',
    Martes: 'aun',
    Miercoles: 'aun',
    Jueves: 'aun',
    Viernes: 'aun',
    Sabado: 'aun',
  }); // Estado para los días de la racha
  const [top3, setTop3] = useState([]); // Estado para el top 3 de rachas
  const [totalWeek, setTotalWeek] = useState(0); // Estado para el progreso semanal total
  const [completedWeek, setCompletedWeek] = useState(0); // Estado para el progreso semanal completado

  // Función para obtener el progreso del día
  async function getDayProgress(Email, day) {
    try {
      const response = await axios.post('http://localhost:8888/dayProgress', { correo: Email, dia: day });
      const data = response.data;
      setDayProgress(data.progreso);
    } catch (error) {
      console.log(error.response);
    }
  }

  // Función para obtener la racha
  async function getRacha(Email) {
    try {
      const response = await axios.post('http://localhost:8888/streak', { correo: Email });
      const data = response.data.streak;
      setRacha(data.racha);
      console.log(Racha);
      setDiasRacha({
        Domingo: data.domingo,
        Lunes: data.lunes,
        Martes: data.martes,
        Miercoles: data.miercoles,
        Jueves: data.jueves,
        Viernes: data.viernes,
        Sabado: data.sabado,
      });
    } catch (error) {
      console.log(error.response);
    }
  }

  // Función para obtener la información del usuario
  async function getData(Email) {
    try {
      const response = await axios.post('http://localhost:8888/user', { correo: Email });
      const data = response.data;
      if (data.resultado) {
        setNombre(data.nombre);
        setApellido(data.apellido);
        setPeso(data.peso);
        setEstatura(data.estatura);
        setEdad(data.edad);
        setImagenUsuario(data.imagen_usuario);
      } else {
        alert(data.mensaje);
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  // Función para obtener el progreso semanal
  async function getWeekProgress(Email) {
    try {
      const response = await axios.post('http://localhost:8888/weekProgress', { correo: Email });
      const data = response.data;
      console.log(data.total);
      setTotalWeek(data.total);
      console.log(totalWeek);
      setCompletedWeek(data.completed);
    } catch (error) {
      console.log(error.response);
    }
  }

  // Función para obtener el top 3 de rachas
  async function getTop3() {
    try {
      const result = await axios.post('http://localhost:8888/topThreeStreaks');
      const data = result.data;
      setTop3(data.topThreeStreaks);
    } catch (error) {
      console.log(error.response);
    }
  }

  console.log(top3);

  // useEffect utilizado para obtener la información del usuario al cargar la página
  useEffect(() => {
    getData(correo);
    getDayProgress(correo, Day);
    getRacha(correo);
    getWeekProgress(correo);
    getTop3();
  }, []);

  // Función para abrir el menú de usuario
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Función para cerrar el menú de usuario
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Función para abrir el drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };

  

  // Función para manejar las opciones del menú de usuario
  function handleProfileOptions(option) {
    if (option === "Mi Perfil") {
      setMyProfilePage(true);
      setHomePage(false);
      setRutinasPage(false);
      setDietasPage(false);
      setAnchorElUser(null);
    } else if (option === "Cerrar Sesion") {
      navigate('/'); // Navegamos a la página de login
    }
  }

  // Función para manejar las opciones del drawer
  function NavigationSelect(pagina) {
    if (pagina === "Home") {
      setMyProfilePage(false);
      setHomePage(true);
      setRutinasPage(false);
      setDietasPage(false);
    } else if (pagina === "Mis Rutinas") {
      setMyProfilePage(false);
      setHomePage(false);
      setRutinasPage(true);
      setDietasPage(false);
    } else if (pagina === "Mi Dieta") {
      setMyProfilePage(false);
      setHomePage(false);
      setRutinasPage(false);
      setDietasPage(true);
    }
  }


    
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* Contenedor principal */}
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* Barra de aplicación (AppBar) */}
        <AppBar className='var' position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            {/* Botón para abrir el Drawer */}
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            {/* Título y nombre de usuario */}
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Hola, {nombre} {apellido}!
            </Typography>
            {/* Menú de usuario */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar sx={{ backgroundColor: '#6dbf26' }} alt={nombre} src={require(`../avatars/${imagen_usuario}`)} />
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
              {/* Opciones de menú de usuario */}
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleProfileOptions(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
        {/* Drawer (Menú lateral) */}
        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space', px: [0] }}>
            {/* Logo de la aplicación */}
            <img src={logo} alt="Logo-Primeia" border="0" width="170px" height="100px" />
            <div sx={{ flexGrow: 1, display: 'flex', width: '100%', height: '100%' }}>
              {/* Botón para cerrar el Drawer */}
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
          </Toolbar>
          {/* Lista de páginas en el Drawer */}
          <List component="nav">
            {paginas.map((key, index) => (
              <ListItemButton key={index} onClick={() => NavigationSelect(key)} sx={{ height: '90px' }}>
                <ListItemIcon sx={{ textAlign: 'center' }}>
                  {/* Iconos de páginas */}
                  {index === 0 ? <HomeIcon sx={{ color: '#3996D4', textAlign: 'center' }} /> : ''}
                  {index === 1 ? <FitnessCenterIcon sx={{ color: '#3996D4' }} /> : ''}
                  {index === 2 ? <RestaurantMenuIcon sx={{ color: '#3996D4' }} /> : ''}
                </ListItemIcon>
                <ListItemText primary={key} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        {/* Contenido principal */}
        <Box component="main" sx={{ backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, height: '100vh', overflow: 'auto' }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
            {/* Contenido de la página de inicio */}
            {HomePage ? (
              <Grid container spacing={5}>
                {/* Sección de Rachas */}
                <Grid item xs={14} md={8} lg={4}>
                  {/* Panel de Racha Actual */}
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 280, alignItems: 'center' }}>
                    <Typography component="h1" variant="h6" color="#3996D4" noWrap sx={{ mb: 3 }}>
                      RACHA ACTUAL
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h1">{Racha}</Typography>
                      <Typography variant="h4">Días</Typography>
                    </Box>
                  </Paper>
                </Grid>
                {/* Panel de Top 3 de Rachas */}
                <Grid item xs={14} md={8} lg={4}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 280, alignItems: 'center' }}>
                    <Typography component="h1" variant="h6" color="#3996D4" noWrap sx={{ flexGrow: 0 }}>
                      TOP 3 RACHAS
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {/* Tabla de las tres mejores rachas */}
                      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead style={{ background: 'linear-gradient(to right, #6dbf26, #3996D4)' }}>
                          <tr className='head'>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd', color: 'white' }}>Rank</th>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd', color: 'white' }}>Nombre</th>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd', color: 'white' }}>Apellido</th>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd', color: 'white' }}>Racha</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Filas de las tres mejores rachas */}
                          {top3.map((item, index) => (
                            <tr className='body' key={index} style={{ cursor: 'pointer' }}>
                              <td style={{ padding: '10px', textAlign: 'center', border: '10px 1px 0px 0px solid #ddd' }}>{index + 1}</td>
                              <td style={{ padding: '10px', textAlign: 'center' }}>{item.nombre}</td>
                              <td style={{ padding: '10px', textAlign: 'center' }}>{item.apellido}</td>
                              <td style={{ padding: '10px', textAlign: 'center' }}>{item.racha} días</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Paper>
                </Grid>
                {/* Panel de Progreso Diario */}
                <Grid item xs={12} md={4} lg={4}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 280, alignItems: 'center' }}>
                    <Typography component="h1" variant="h6" color="#3996D4" noWrap sx={{ flexGrow: 1 }}>
                      PROGRESO DIARIO
                    </Typography>
                    {/* Componente para mostrar el progreso diario en forma de gráfico radial */}
                    <RadialBar dayProgress={dayProgress} />
                  </Paper>
                </Grid>
                {/* Panel de Progreso Semanal */}
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h6" color="#3996D4" noWrap sx={{ flexGrow: 0 }}>
                      PROGRESO SEMANAL
                    </Typography>
                    <Box className='days' sx={{ mt: 2, width: '80%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      {/* Días de la semana y su progreso */}
                      {Object.entries(diasRacha).map(([day, value]) => (
                        <Grid item xs={12} sm={6} md={4} lg={1} key={day} sx={{ textAlign: 'center' }}>
                          <Typography sx={{ color: 'black', mb: 2 }} variant="body1">{day}</Typography>
                          {/* Icono de marca de verificación, cruz o barra horizontal según el progreso */}
                          {value === 'aun' ? (
                            <HorizontalRuleIcon sx={{ flexGrow: 1, color: 'gray', fontSize: 80 }} />
                          ) : value === 'si' ? (
                            <CheckIcon sx={{ flexGrow: 1, color: '#6dbf26', fontSize: 80 }} />
                          ) : (
                            <CloseIcon sx={{ flexGrow: 1, color: 'red', fontSize: 80 }} />
                          )}
                        </Grid>
                      ))}
                    </Box>
                    <Box sx={{ width: '80%', margin: 'auto', display: 'flex', flexDirection: 'column' }}>
                      {/* Gráfico de barras para mostrar el progreso semanal */}
                      <BarChart totalWeek={totalWeek} completedWeek={completedWeek} />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            ) : ''}
          </Container>
          {/* Componentes para otras páginas (Rutinas y Dietas) */}
          {RutinasPage ? <MisRutinas email={correo} open={open} RutinasPage={RutinasPage} setRutinasPage={setRutinasPage} /> : ''}
          {DietasPage ? <MisDietas email={correo} open={open} /> : ''}
          {MyProfilePage ? <MiPerfil email={correo} open={open} nombre={nombre} apellido={apellido} peso={peso} edad={edad} estatura={estatura} imagen_usuario={imagen_usuario} /> : '' }
        </Box>
      </Box>
    </ThemeProvider>
  );
}