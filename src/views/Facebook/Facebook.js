/*global FB*/
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

class Facebook extends React.Component {

  constructor(props) {
    super(props);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.testAPI = this.testAPI.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
  }

  state = {
    page_name: ''
  }

  handlePageChange = (event) => {
    this.setState({
      ...this.state,
      page_name: event.target.value
    })
  }

  componentDidMount() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '862008614311891',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
      FB.Event.subscribe('auth.statusChange', function (response) {
        if (response.authResponse) {
          this.checkLoginState();
        } else {
          console.log('---->User cancelled login or did not fully authorize.');
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
    console.log('Welcome! Fetching your information.... ');
    FB.api('/me', function (response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
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
    FB.getLoginStatus(function (response) {
      this.statusChangeCallback(response);
      console.log(response);
    }.bind(this));
  }

  handleClick = () => {
    FB.login(this.checkLoginState());
  }

  facebookResponse = (response) => {
    console.log(response);
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
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
            <PageName />
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

    )
  }
}

Facebook.propTypes = {
  history: PropTypes.object
};

export default withRouter(Facebook);
