import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'

import {createBrowserRouter, RouterProvider ,Route, Routes} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/SignUp',
    element:<SignUp/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
