import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Analysis, SubReddit } from './components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import axios from 'axios';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Reddit = (props) => {
  const classes = useStyles();
  const [subreddit, setSubReddit] = useState("");
  const [analysis, setAnalysis] = useState({
    sentimental: true,
    question: false,
    news: false,
    hashtag: false,
    comments: true
  })

  const [progress, setProgress] = useState(false)

  const [snackbar, setSnackBar] = useState({
    success: false,
    error: false
  })

  const handleCloseSnackBar = () => {
    setSnackBar(snackbar => ({
      success: false,
      error: false
    }))
  }

  const handleCheckBoxChange = (event) => {
    setAnalysis({
      ...analysis,
      [event.target.name]: event.target.checked
    })
  }

  const handleTextChange = (event) => {
    setSubReddit(event.target.value);
  }


  const saveRedditAnalysis = () => {
    setProgress(true);
    console.log({
      user_id: props.id,
      subreddit: subreddit,
      analyzer: {
        sentimental: analysis.sentimental,
        question: analysis.question,
        hashtags: false,
        followers: false,
        news: false,
        comments: true
      }
    })

    axios.post('/reddit_analysis', {
      user_id: props.id,
      subreddit: subreddit,
      analyzer: {
        sentimental: analysis.sentimental,
        question: analysis.question,
        hashtags: false,
        followers: false,
        news: false,
        comments: true
      }
    }).then(response => {
      setSnackBar(snackbar => ({
        ...snackbar,
        success: true
      }))
      setAnalysis(analysis => ({
        sentimental: true,
        question: false,
        news: false,
        hashtag: false,
        comment: true
      }))
      setSubReddit("")
    }).catch(error => {
      setSnackBar(snackbar => ({
        ...snackbar,
        error: true
      }))
    })
    setProgress(false);
  }

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
          <SubReddit handleTextChange={handleTextChange} subreddit={subreddit} />
        </Grid>
        <Grid
          item
          md={7}
          xs={12}
        >
          <Analysis handleCheckBoxChange={handleCheckBoxChange} analyze={
            (analysis.question || analysis.sentimental || analysis.hashtag || analysis.news || analysis.comment) &&
            (subreddit.length > 0)
          } saveRedditAnalysis={saveRedditAnalysis} />
        </Grid>

      </Grid>
      <Backdrop style={{ zIndex: '300' }} open={progress}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={snackbar.success} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity="success">
          Data successfully stored, we'll start with analysis on your reddit data
          </Alert>
      </Snackbar>
      <Snackbar open={snackbar.error} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity="error">
          Oh No, You shouldn't have seen this, analysis couldn't start, Please try again.
        </Alert>
      </Snackbar>

    </div>
  );
};

const mapStateToProps = state => {
  return {
    id: state.user.id,
  };
}

export default connect(mapStateToProps)(Reddit);
