import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Questions from './../Questions'
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { connect } from 'react-redux';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class QuoraAnalysis extends Component {


    constructor(props) {
        super(props)
        axios.post('/get_quora_analysis', {
            user_id: this.props.id,
        }).then(response => {
            this.setState({
                progress: false
            })
        }).catch(error => {
            this.setState({
                error_snackbar: true,
            })
        })
    }

    state = {
        progress: true,
        error_snackbar: false
    }

    handleCloseSnackBar = () => {
        this.setState({
            ...this.state,
            error_snackbar: false
        })
    }


    render() {
        return (
            <div style={{ marginTop: '20px' }}>
                <Grid
                    container
                    spacing={4}
                >
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        {
                            this.state.progress ?
                                <Box pt={0.5}>
                                    <Skeleton variant="rect" height={60} style={{ backgroundColor: '#d3d3d3' }} />
                                    <Skeleton style={{ backgroundColor: '#d3d3d3' }} animation="wave" />
                                    <Skeleton width="60%" style={{ backgroundColor: '#d3d3d3' }} />
                                </Box>
                                : <Questions question_answer={"QUESTIONS"} questions={this.state.questions_count} />
                        }
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >

                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        {
                            this.state.progress ?
                                <Box pt={0.5}>
                                    <Skeleton variant="rect" height={60} style={{ backgroundColor: '#d3d3d3' }} />
                                    <Skeleton style={{ backgroundColor: '#d3d3d3' }} animation="wave" />
                                    <Skeleton width="60%" style={{ backgroundColor: '#d3d3d3' }} />
                                </Box>
                                : <Questions question_answer={"ANSWERS"} questions={this.state.answers_count} />
                        }


                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                    </Grid>
                    {!this.state.progress ?
                        <>
                            <Grid
                                item
                                lg={8}
                                md={12}
                                xl={9}
                                xs={12}
                            >
                                <Questions question_answer={"QUESTIONS"} />

                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xl={3}
                                xs={12}
                            >
                                <Questions question_answer={"ANSWERS"} />
                            </Grid>
                        </> : null}
                </Grid>
                <Snackbar open={this.state.error_snackbar} autoHideDuration={3000} onClose={this.handleCloseSnackBar}>
                    <Alert onClose={this.handleCloseSnackBar} severity="error">
                        Analysis still in progress, Kindly wait or come back later.
                  </Alert>
                </Snackbar>

            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        id: state.user.id,
    };
}

export default connect(mapStateToProps)(QuoraAnalysis);