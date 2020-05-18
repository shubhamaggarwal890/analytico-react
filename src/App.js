import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createBrowserHistory } from 'history';
import theme from './theme';
import Routes from './Routes';

const browserHistory = createBrowserHistory();

class App extends Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>

    )
  }
}

export default App;
