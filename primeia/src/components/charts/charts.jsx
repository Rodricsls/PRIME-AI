import React from 'react';
import Chart from 'react-apexcharts';


// a radialBar gradient chart
const RadialBar = ({dayProgress}) => {
    const day=dayProgress;
    const options = {
        chart: {
        type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                    background: '#FFFFFF',
                },
                track: {
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 6,
                        opacity: 0.15,
                    },
                },
                dataLabels: {
                name: {
                    fontSize: '22px',
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
                stops: [0, 100],
            },
        },
        stroke: {
            lineCap: 'round',
        },
        labels:['Completado'],
    };
    console.log(dayProgress);
    const series = [Math.round(dayProgress)];


    
    return (
        <div>
            <Chart options={options} series={series} type="radialBar" height={245} />
        </div>
    );
    };

 export default RadialBar;
