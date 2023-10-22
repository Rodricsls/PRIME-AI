import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import './Form3.css';

function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }



  const PrettoSlider = styled(Slider)({
    color: '#6dbf26',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid #6dbf26',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#6dbf26',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

  export default function Form3(props) {
    const { edad, estatura, peso, handleEdadChange, handleEstaturaChange, handlePesoChange } = props;
    return (

      <div className='sliders'  style={{width:'70%', maxHeight: '500px', overflowY: 'auto' }}>

        <Typography>
          Ingresa tu edad:
        </Typography>
        <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
        <TextField min='20' id="outlined-basic" label="Ingrese su edad:" variant="outlined" value={edad} onChange={handleEdadChange}/>
        </Box>
        <Box sx={{ width: 320 }}>
          <Box sx={{ ml: 3 }} />
            <Typography gutterBottom>Ingresa tu estatura:</Typography>
            <PrettoSlider
              valueLabelFormat={(value)=>`${value}cm`}
              value={estatura}
              onChange={(event, newValue) => handleEstaturaChange(newValue)}
              step={1}
              min={100}
              max={220}
              valueLabelDisplay="on"
              size='medium'
              aria-label="pretto slider" />
        </Box>
        <Box sx={{ width: 320 }}>
          <Box sx={{ ml: 3 }} />
            <Typography gutterBottom>Ingresa tu peso:</Typography>
            <PrettoSlider
              valueLabelFormat={(value)=>`${value}lb`}
              value={peso}
              onChange={(event, newValue) => handlePesoChange(newValue)}
              step={1}
              min={70}
              max={320}
              valueLabelDisplay="on"
              size='medium'
              aria-label="pretto slider" />
        </Box>
        
      </div>
       
    );
  }