import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class App extends Component {

  facebookResponse = (response) => {
    console.log(response);

  }
  render() {
    return (
      <FacebookLogin
        appId='862008614311891'
        autoLoad={true}
        fields='posts'
        cssClass='my-facebook-button-class'
        icon='fa-facebook'
        callback={this.facebookResponse}
      />
    )
  }
}

export default App;
