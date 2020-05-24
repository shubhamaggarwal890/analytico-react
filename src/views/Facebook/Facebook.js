import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import { Facebook as FacebookIcon } from './../../icons';
import { PageName, Analysis } from './components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import axios from 'axios';
import { connect } from 'react-redux';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class Facebook extends React.Component {

  constructor(props) {
    super(props);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.testAPI = this.testAPI.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
  }

  state = {
    page_name: '',
    name: '',
    email: '',
    sentimental: true,
    question: false,
    hashtag: true,
    token: null,
    snackbar: false,
    error_snackbar: false,
    progress: false
  }

  componentDidMount() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '862008614311891',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      window.FB.AppEvents.logPageView();
      window.FB.Event.subscribe('auth.statusChange', function (response) {
        if (response.authResponse) {
          this.checkLoginState();
        }
      }.bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  testAPI = () => {
    window.FB.api('/me', 'GET', { "fields": "name,email" }, function (response) {
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
      this.setState({
        name: response.name,
        email: response.email,
      })
    }.bind(this));
  }

  statusChangeCallback = (response) => {
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  checkLoginState = () => {
    window.FB.getLoginStatus(function (response) {
      this.statusChangeCallback(response);
      if (response.authResponse) {
        this.setState({
          token: response.authResponse.accessToken
        })
      }
    }.bind(this));
  }

  handleClick = () => {
    if (!window.FB) {
      document.getElementById('status').innerHTML = 'We do not entertain request in incognito.';
    } else {
      window.FB.login(this.checkLoginState());
    }
  }

  handlePageChange = (event) => {
    this.setState({
      ...this.state,
      page_name: event.target.value
    })
  }

  handleCheckBoxChange = (event) => {
    this.setState({
      [event.target.name]: event.target.checked
    })

  }

  handleCloseSnackBar = () => {
    this.setState({
      ...this.state,
      snackbar: false,
      error_snackbar: false
    })
  }


  saveFacebookAnalysis = () => {
    this.setState({
      progress: true
    })
    console.log({
      user_id: this.props.id,
      token: this.state.token,
      email: this.state.email,
      name: this.state.name,
      page: this.state.page_name.length > 0 ? this.state.page_name : null,
      analyzer: {
        sentimental: this.state.sentimental,
        question: this.state.question,
        hashtags: this.state.hashtag,
        followers: true
      }
    });
    axios.post('/facebook_analysis', {
      user_id: this.props.id,
      token: this.state.token,
      email: this.state.email,
      name: this.state.name,
      page: this.state.page_name.length > 0 ? this.state.page_name : null,
      analyzer: {
        sentimental: this.state.sentimental,
        question: this.state.question,
        hashtags: true,
        followers: true
      }
    }).then(response => {
      this.setState({
        page_name: '',
        name: '',
        email: '',
        sentimental: true,
        question: false,
        hashtag: true,
        token: null,
        snackbar: true,
        error_snackbar: false,
        progress: false
      })
    }).catch(error => {
      this.setState({
        error_snackbar: true,
        progress: false
      })
    })
  }

  render() {
    return (
      <div>
        <Grid container style={{ height: '100%' }}>
          <Grid item lg={7} xs={12} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flexGrow: '1', display: 'flex', alignItems: 'center' }}>
                <form
                  style={{
                    paddingLeft: 35,
                    paddingRight: 35,
                    paddingBottom: 20,
                    flexBasis: 700,
                  }}
                >
                  <Typography variant="h2" style={{ marginTop: '20px' }}>
                    Sign in
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Analyze your posts
                </Typography>
                  <Grid container spacing={2} style={{ marginTop: '10px' }}>
                    <Grid item>
                      <Button
                        color="primary"
                        size="large"
                        variant="contained"
                        onClick={this.handleClick}
                      >
                        <FacebookIcon />
                          Login with Facebook
                    </Button>
                    </Grid>
                    <Grid item>
                      <div id='status'></div>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            md={5}
            xs={12}
          >
            <PageName handlePageChange={this.handlePageChange} page_name={this.state.page_name} />
          </Grid>
          <Grid
            item
            md={7}
            xs={12}
          >
            <Analysis handleCheckBoxChange={this.handleCheckBoxChange}
              analyze={(this.state.sentimental || this.state.hastag || this.state.question) && this.state.token != null}
              saveFacebookAnalysis={this.saveFacebookAnalysis}
            />
          </Grid>
        </Grid>
        <Backdrop style={{ zIndex: '300'}} open={this.state.progress}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar open={this.state.snackbar} autoHideDuration={3000} onClose={this.handleCloseSnackBar}>
          <Alert onClose={this.handleCloseSnackBar} severity="success">
            Data successfully stored, we'll start with analysis on your facebook data
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.error_snackbar} autoHideDuration={3000} onClose={this.handleCloseSnackBar}>
          <Alert onClose={this.handleCloseSnackBar} severity="error">
            Oh No, You shouldn't have seen this, analysis couldn't start, Please try again.
          </Alert>
        </Snackbar>

      </div>

    )
  }
}

Facebook.propTypes = {
  history: PropTypes.object
};

const mapStateToProps = state => {
  return {
    id: state.user.id,
  };
}

export default connect(mapStateToProps)(withRouter(Facebook));
