import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Followers from './../Followers'
import Friends from './../Friends'
import Hashtags from './../Hashtags'
import Tweets from './../Tweets'
import HashtagChart from './../HashtagChart'
import Sentiments from './../S_Doughnut';
import NQDoughnut from './../NQ_Doughnut';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { connect } from 'react-redux';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class TwitterAnalysis extends Component {

    constructor(props) {
        super(props)
        axios.post('/get_twitter_analysis', {
            user_id: this.props.id,
        }).then(response => {
            console.log(response.data);
            if (response.data.message) {
                this.setState({
                    message: response.data.message,
                    error_snackbar: true,
                })
            }
            if (response.data.following) {
                let l = [];
                let f = [];
                let s_t = [];
                let n_t = [];
                let q_t = [];
                let s_h = [];
                let n_h = [];
                let q_h = [];

                if (response.data.hashtags) {
                    response.data.hashtags.forEach(element => {
                        l.push(element.name)
                        f.push(element.number)
                    });
                }

                if (response.data.s_positive !== 0 || response.data.s_negative !== 0 || response.data.s_neutral !== 0) {

                    s_t.push(response.data.s_positive);
                    s_t.push(response.data.s_neutral);
                    s_t.push(response.data.s_negative);
                }
                if (response.data.q_true !== 0 || response.data.q_false !== 0) {
                    q_t.push(response.data.q_true);
                    q_t.push(response.data.q_false);
                }
                if (response.data.n_true !== 0 || response.data.n_fake !== 0) {
                    n_t.push(response.data.n_true);
                    n_t.push(response.data.n_fake);
                }

                if(response.data.h_model!==null){
                    this.setState({
                        h_name: response.data.h_model.name
                    })
                    if (response.data.h_model.s_positive !== 0 || response.data.h_model.s_negative !== 0 || response.data.h_model.s_neutral !== 0) {
                        s_h.push(response.data.h_model.s_positive);
                        s_h.push(response.data.h_model.s_neutral);
                        s_h.push(response.data.h_model.s_negative);
                    }
                    if (response.data.h_model.q_true !== 0 || response.data.h_model.q_false !== 0) {
                        q_h.push(response.data.h_model.q_true);
                        q_h.push(response.data.h_model.q_false);
                    }
                    if (response.data.h_model.n_true !== 0 || response.data.h_model.n_fake !== 0) {
                        n_h.push(response.data.h_model.n_true);
                        n_h.push(response.data.h_model.n_fake);
                    }
                }
                this.setState({
                    following: response.data.following,
                    followers: response.data.followers,
                    screen_name: response.data.screen_name,
                    tweets_count: response.data.tweets_count,
                    hashtags_count: response.data.hashtags_count,
                    progress: false,
                    labels: l,
                    frequency: f,
                    sentiment: s_t,
                    news: n_t,
                    question: q_t,
                    h_sentiment: s_h,
                    h_news: n_h,
                    h_question: q_h
                })
                console.log({
                    following: response.data.following,
                    followers: response.data.followers,
                    tweets_count: response.data.tweets_count,
                    hashtags_count: response.data.hashtags_count,
                    progress: false,
                    labels: l,
                    frequency: f,
                    sentiment: s_t,
                    news: n_t,
                    question: q_t
                });
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
        following: null,
        followers: null,
        tweets_count: null,
        hashtags_count: null,
        labels: [],
        frequency: [],
        sentiment: [],
        news: [],
        question: [],
        h_sentiment: [],
        h_news: [],
        h_question: [],
        h_name: null
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
                                : <Followers followers={this.state.followers} />
                        }
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
                                : <Friends friends_following={"FOLLOWING"} friends={this.state.following} />
                        }
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
                                : <Tweets tweets={this.state.tweets_count} />
                        }
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
                                : <Hashtags hashtags={this.state.hashtags_count} />
                        }
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
                                    <HashtagChart labels={this.state.labels} frequency={this.state.frequency} label_title={"Hashtag Frequency"}
                                        title={"Frequency of HashTags"} />

                                </Grid>
                                : null
                            }
                            {this.state.sentiment.length !== 0 ?
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={3}
                                    xs={12}
                                >
                                    <Sentiments value={this.state.sentiment} title={"Sentiments on "+this.state.screen_name+" timeline"} />

                                </Grid>
                                : null
                            }
                            {this.state.news.length !== 0 ?
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={3}
                                    xs={12}
                                >
                                    <NQDoughnut value={this.state.news} title={"Fact Check on "+this.state.screen_name+" timeline"} />

                                </Grid>
                                : null
                            }

                            {this.state.question.length !== 0 ?
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={3}
                                    xs={12}
                                >
                                    <NQDoughnut value={this.state.question} title={"Questions on "+this.state.screen_name+" timeline"} />

                                </Grid>
                                : null
                            }
                            {this.state.h_news.length !== 0 ?
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={3}
                                    xs={12}
                                >
                                    <NQDoughnut value={this.state.h_news} title={"Fact Check on hashtag "+this.state.h_name} />

                                </Grid>
                                : null
                            }

                            {this.state.h_sentiment.length !== 0 ?
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={3}
                                    xs={12}
                                >
                                    <Sentiments value={this.state.h_sentiment} title={"Sentiments on hashtag "+this.state.h_name} />

                                </Grid>
                                : null
                            }
                            {this.state.h_question.length !== 0 ?
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={3}
                                    xs={12}
                                >
                                    <NQDoughnut value={this.state.h_question} title={"Questions on hashtag "+this.state.h_name} />

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
            </div >

        )
    }
}

const mapStateToProps = state => {
    return {
        id: state.user.id,
    };
}

export default connect(mapStateToProps)(TwitterAnalysis);