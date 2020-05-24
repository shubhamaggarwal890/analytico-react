import React from 'react';
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
} from '@material-ui/core';
import palette from './../../../../theme/palette';


const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const HashtagChart = props => {
  const { className, ...rest } = props;

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.label_title,
        backgroundColor: palette.primary.main,
        data: props.frequency
      }
    ]
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    legend: { display: false },
    cornerRadius: 20,
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: palette.divider,
      backgroundColor: palette.white,
      titleFontColor: palette.text.primary,
      bodyFontColor: palette.text.secondary,
      footerFontColor: palette.text.secondary
    },
    layout: { padding: 0 },
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: palette.divider
          }
        }
      ]
    }
  };
  

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title={props.title}
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={data}
            options={options}
          />
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};


export default HashtagChart;
