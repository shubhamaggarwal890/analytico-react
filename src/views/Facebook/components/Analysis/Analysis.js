import React from 'react';
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
  const classes = useStyles();

  return (
    <Card>
      <form>
        <CardHeader
          subheader="Analyze facebook data"
          title="Facebook"
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
                    defaultChecked
                    name="sentimental"
                    onChange={props.handleCheckBoxChange}
                  />
                }
                label="Sentiments"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Question Detection"
                name="question"
                onChange={props.handleCheckBoxChange}

              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked
                    name="hashtag"
                    onChange={props.handleCheckBoxChange}

                  />
                }
                label="Monitor Hashtags"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          {props.analyze ?
            <Button
              color="primary"
              variant="outlined"
              onClick={props.saveFacebookAnalysis}
            >
              Analyze
          </Button>
            :
            <Button
              color="primary"
              variant="outlined"
              onClick={props.saveFacebookAnalysis}
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
