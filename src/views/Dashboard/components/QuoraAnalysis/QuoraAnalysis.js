import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Questions from './../Questions'
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { connect } from 'react-redux';
import HashtagChart from './../HashtagChart'
import Sentiments from './../S_Doughnut';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class QuoraAnalysis extends Component {


    constructor(props) {
        super(props)
        axios.post('/get_quora_analysis', {
            user_id: this.props.id,
        }).then(response => {
            console.log(response);
            if (response.data.message) {
                this.setState({
                    message: response.data.message,
                    error_snackbar: true
                })
            }
            this.setState({
                query: response.data.query,
                questions_count: response.data.question_count == null ? 0 : response.data.question_count,
                answers_count: response.data.answer_count == null ? 0 : response.data.answer_count,
                question: response.data.question
            })

            let l = [], f = [], q_a_s = [], qu_a_s = [];
            response.data.answers.forEach(element => {
                l.push(element.name)
                f.push(element.number)
            });

            if (response.data.s_positive !== 0 || response.data.s_negative !== 0 || response.data.s_neutral !== 0) {
                q_a_s.push(response.data.s_positive);
                q_a_s.push(response.data.s_neutral);
                q_a_s.push(response.data.s_negative);
            }

            if (response.data.q_s_positive !== 0 || response.data.q_s_negative !== 0 || response.data.q_s_neutral !== 0) {
                qu_a_s.push(response.data.q_s_positive);
                qu_a_s.push(response.data.q_s_neutral);
                qu_a_s.push(response.data.q_s_negative);
            }

            this.setState({
                labels: l,
                frequency: f,
                q_sentiment: q_a_s,
                qu_sentiment: qu_a_s,
            })
            if(response.data.question_count!=null){
                this.setState({
                    progress: false,
                })   
            }


        }).catch(error => {
            this.setState({
                error_snackbar: true,
                message: "Oh No, You shouldn't have seen this. Some error occurred please try again."
            })
        })
    }

    state = {
        progress: true,
        error_snackbar: false,
        message: null,
        query: null,
        question: null,
        questions_count: null,
        answers_count: null,
        labels: [],
        frequency: [],
        q_sentiment: [],
        qu_sentiment: [],
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
                            {this.state.labels.length > 0 && this.state.frequency.length > 0 ?
                                <Grid
                                    item
                                    lg={8}
                                    md={12}
                                    xl={9}
                                    xs={12}
                                >
                                    <HashtagChart labels={this.state.labels} frequency={this.state.frequency} label_title={"Answer Frequency"}
                                        title={"Answer frequency to questions"} />

                                </Grid>
                                : null
                            }
                            {this.state.q_sentiment.length !== 0 ?
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={3}
                                    xs={12}
                                >
                                    <Sentiments value={this.state.q_sentiment} title={"Sentiments on answer to query"} />

                                </Grid>
                                : null
                            }
                            {this.state.qu_sentiment.length !== 0 ?
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={3}
                                    xs={12}
                                >
                                    <Sentiments value={this.state.qu_sentiment} title={"Sentiments on answer to question"} />

                                </Grid>
                                : null
                            }

                        </> : null}
                </Grid>
                <Snackbar open={this.state.error_snackbar} autoHideDuration={3000} onClose={this.handleCloseSnackBar}>
                    <Alert onClose={this.handleCloseSnackBar} severity="error">
                        {this.state.message}
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