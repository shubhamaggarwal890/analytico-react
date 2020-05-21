import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Tweets, Hashtag } from './components';
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

const Twitter = (props) => {
  const classes = useStyles();

  const [screen_name, setScreenName] = useState("");
  const [hashtag_data, setHashtagData] = useState("");
  const [analysis, setAnalysis] = useState({
    sentimental: true,
    question: false,
    news: true,
    hashtag: false
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
    if (event.target.name === 'hashtag') {
      setHashtagData(event.target.value);
    } else {
      setScreenName(event.target.value);
    }
  }

  const saveTwitterAnalysis = () => {
    setProgress(true);
    let hashtags = []
    if (hashtag_data.length > 0) {
      hashtag_data.split(",").forEach(hashtag => {
        hashtags.push({
          name: hashtag
        })
      })
    }
    console.log({
      user_id: props.id,
      screen_name: screen_name.length > 0 ? screen_name : null,
      hashtags: hashtags,
      analyzer: {
        sentimental: analysis.sentimental,
        question: analysis.question,
        hashtags: analysis.hashtag,
        followers: true,
        news: analysis.news
      }
    })

    axios.post('/twitter_analysis', {
      user_id: props.id,
      screen_name: screen_name.length > 0 ? screen_name : null,
      hashtags: hashtags,
      analyzer: {
        sentimental: analysis.sentimental,
        question: analysis.question,
        hashtags: analysis.hashtag,
        followers: true,
        news: analysis.news
      }
    }).then(response => {
      setSnackBar(snackbar => ({
        ...snackbar,
        success: true
      }))
      setAnalysis(analysis => ({
        sentimental: true,
        question: false,
        news: true,
        hashtag: false
      }))
      setScreenName("");
      setHashtagData("");
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
          <Hashtag handleTextChange={handleTextChange} screen_name={screen_name} hashtag_data={hashtag_data} />
        </Grid>
        <Grid
          item
          md={7}
          xs={12}
        >
          <Tweets handleCheckBoxChange={handleCheckBoxChange} analyze={
            (analysis.question || analysis.sentimental || analysis.hashtag || analysis.news) &&
            (screen_name.length > 0 || hashtag_data.length > 0)
          } saveTwitterAnalysis={saveTwitterAnalysis} />
        </Grid>
      </Grid>
      <Backdrop style={{ zIndex: '300', color: '#000' }} open={progress}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={snackbar.success} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity="success">
          Data successfully stored, we'll start with analysis on your twitter data
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

export default connect(mapStateToProps)(Twitter);
