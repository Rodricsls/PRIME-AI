import React from 'react';
import Chart from 'react-apexcharts';

function BarChart(totalWeek) {
    const options = {
        chart: {
          type: 'bar',
          height: 100,
          width: '100%',
          toolbar: {
            show: false, // Deshabilita las opciones de descarga
            },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '100%',
            dataLabels: {
                enabled: true,
                name: {
                    fontSize: '28px',
                    offsetY: -2,
                    color:'#3996D4'
                },
                value: {
                    fontSize: '16px',
                    show: true,
                },
              },
          },
        },
        dataLabels: {
            enabled: true,
            style: {
              fontSize: '18px', 
            },

          },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#6dbf26'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
          },
        xaxis: {
          min: 0,
          max: parseInt(totalWeek.totalWeek),
          title: {
            text: 'Total Ejercicios Semanales',
            style: {
              fontSize: '12px',
            },
          },
        },
        yaxis: {
          show: false,
        },
        
      };
      
    
      const series = [
        {
          name: 'Ejericios completados',
          data: [totalWeek.completedWeek],
        },
      ];
    
      return (
        <div className="app">
          <Chart options={options} series={series} type="bar" height={110} />
        </div>
      );
    }

export default BarChart;