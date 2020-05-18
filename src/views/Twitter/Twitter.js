import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Tweets, Hashtag } from './components';

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
          <Hashtag />
        </Grid>
        <Grid
          item
          md={7}
          xs={12}
        >
          <Tweets />
        </Grid>

      </Grid>
    </div>
  );
};

export default Settings;
