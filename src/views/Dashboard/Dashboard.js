import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { ReportToolbar, TAnalysis, FAnalysis, RAnalysis, QAnalysis} from './components'


class Dashboard extends Component {

  state = {
    target: 'twitter'
  }


  handleReportClick = (target) => {
    this.setState({
      ...this.state,
      target: target
    })
  }


  render() {
    return (
      <div style={{ padding: '20px' }}>
        <Grid
          container
          spacing={4}
        >
          <ReportToolbar handleReportClick={this.handleReportClick} target={this.state.target} />
        </Grid>
        {

          this.state.target === 'twitter'?<TAnalysis />:null
        }
        {
          this.state.target === 'facebook'?<FAnalysis />:null
        }
        {
          this.state.target === 'quora'?<QAnalysis />:null
        }
        {
          this.state.target === 'reddit'?<RAnalysis />:null
        }
      </div>
    );
  }

};

export default Dashboard;
