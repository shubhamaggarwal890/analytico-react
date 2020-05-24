import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const S_Doughnut = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: props.value,
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.warning.main,
          theme.palette.error.main
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Positive', 'Neutral', 'Negative']
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const devices = [
    {
      title: 'Positive',
      value: props.value[0],
      icon: <SentimentVerySatisfiedIcon />,
      color: theme.palette.primary.main
    },
    {
      title: 'Neutral',
      value: props.value[1],
      icon: <SentimentSatisfiedIcon />,
      color: theme.palette.warning.main
    },
    {
      title: 'Negative',
      value: props.value[2],
      icon: <SentimentVeryDissatisfiedIcon />,
      color: theme.palette.error.main
    }
  ];

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
          <Doughnut
            data={data}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {devices.map(device => (
            <div
              className={classes.device}
              key={device.title}
            >
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography
                style={{ color: device.color }}
                variant="h2"
              >
                {device.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


export default S_Doughnut;
