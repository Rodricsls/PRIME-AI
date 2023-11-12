import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import MiPerfil from './components/MiPerfil/MiPerfil'
import Cuestionario from './components/Cuestionario/stepper/Cuestionario';
import CreateRoutine from './components/CreateRoutine/CreateRoutine';
import axios from 'axios';
import {createBrowserRouter, RouterProvider ,Route, Routes} from 'react-router-dom';
import ProtectedRoute from './protected';




const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/SignUp',
    element: <SignUp />,
  },
  {
    path: '/Home/*',
    element: <ProtectedRoute><Home /></ProtectedRoute>,
  },
  {
    path: '/MiPerfil/*',
    element: <ProtectedRoute><MiPerfil /></ProtectedRoute>,
  },
  {
    path: '/Cuestionario',
    element: <Cuestionario />,
  },
  {
    path:'/CreateRoutine/*',
    element:<ProtectedRoute><CreateRoutine/></ProtectedRoute>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <RouterProvider router={router}/>
  //</React.StrictMode>
);
// <RouterProvider router={router}/>
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
