import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Query, Analysis } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={5}
          xs={12}
        >
          <Query />
        </Grid>
        <Grid
          item
          md={7}
          xs={12}
        >
          <Analysis />
        </Grid>

      </Grid>
    </div>
  );
};

export default Settings;
