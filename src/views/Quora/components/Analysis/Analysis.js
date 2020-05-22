import React from 'react';
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

const Analysis = props => {
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
                    name="sentimental"
                    onChange={props.handleCheckBoxChange}

                  />
                }
                label="Sentiments"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          {
            props.analyze ?
              <Button
                color="primary"
                variant="outlined"
                onClick={props.saveQuoraAnalysis}
              >
                Analyze
          </Button> :
              <Button
                color="primary"
                variant="outlined"
                disabled
              >
                Analyze
          </Button>
          }

        </CardActions>
      </form>
    </Card>
  );
};

export default Analysis;
