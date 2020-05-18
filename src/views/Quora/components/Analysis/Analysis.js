import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Tweet = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Analyze quora data"
          title="Quora"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                gutterBottom
                variant="h6"
              >
                Analysis Model
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Sentiments"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Question/Statement"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Usage Counts"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
          >
            Analyze
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Tweet.propTypes = {
  className: PropTypes.string
};

export default Tweet;
