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

const Tweet = props => {
  const classes = useStyles();

  return (
    <Card>
      <form>
        <CardHeader
          subheader="Analyze twitter data"
          title="Twitter"
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
              md={6}
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
                control={
                  <Checkbox color="primary"
                    name="question"
                    onChange={props.handleCheckBoxChange}
                  />
                }
                label="Question Detection"

              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked
                    name="news"
                    onChange={props.handleCheckBoxChange}
                  />
                }
                label="Fact Check"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
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
          {
            props.analyze ?
              <Button
                color="primary"
                variant="outlined"
                onClick={props.saveTwitterAnalysis}
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


export default Tweet;
