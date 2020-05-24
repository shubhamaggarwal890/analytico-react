import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Posts from './../Posts'
import Comments from './../Comments'
import Updown from './../Updown'
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

class RedditAnalysis extends Component {

    constructor(props) {
        super(props)
        axios.post('/get_reddit_analysis', {
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
                updown_counts: response.data.updowns == null ? 0 : response.data.updowns,
                posts_count: response.data.post_count == null ? 0 : response.data.post_count,
                comments_count: response.data.comments_count == null ? 0 : response.data.comments_count,
                subreddit: response.data.subreddit
            })
            let p_l = [], p_f = [], c_l = [], c_f = [], p_s_t = [], c_s_t = [], c_c_t = [];
            response.data.ups.forEach(element => {
                p_l.push(element.name)
                p_f.push(element.number)
            });

            if (response.data.comments) {
                response.data.comments.ups.forEach(element => {
                    c_l.push(element.name)
                    c_f.push(element.number)
                });
                if (response.data.comments.s_positive !== 0 || response.data.comments.s_negative !== 0 || response.data.comments.s_neutral !== 0) {
                    c_s_t.push(response.data.comments.s_positive);
                    c_s_t.push(response.data.comments.s_neutral);
                    c_s_t.push(response.data.comments.s_negative);
                }

                if (response.data.comments.c_positive !== 0 || response.data.comments.c_negative !== 0) {
                    c_c_t.push(response.data.comments.c_positive);
                    c_c_t.push(response.data.comments.c_negative);
                }
            }

            if (response.data.s_positive !== 0 || response.data.s_negative !== 0 || response.data.s_neutral !== 0) {
                p_s_t.push(response.data.s_positive);
                p_s_t.push(response.data.s_neutral);
                p_s_t.push(response.data.s_negative);
            }
            this.setState({
                progress: false,
                p_labels: p_l,
                p_frequency: p_f,
                c_labels: c_l,
                c_frequency: c_f,
                p_sentiment: p_s_t,
                c_sentiment: c_s_t,
                c_controversy: c_c_t
            })
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
        subreddit: null,
        posts_count: null,
        updown_counts: null,
        comments_count: null,
        p_labels: [],
        p_frequency: [],
        c_labels: [],
        c_frequency: [],
        p_sentiment: [],
        c_sentiment: [],
        c_controversy: []
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
                                : <Posts posts={this.state.posts_count} />
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
                                : <Comments comments={this.state.comments_count} />
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
                                : <Updown updown={this.state.updown_counts} />
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
                            {this.state.p_labels.length > 0 && this.state.p_frequency.length > 0 ?
                                <Grid
                                    item
                                    lg={8}
                                    md={12}
                                    xl={9}
                                    xs={12}
                                >
                                    <HashtagChart labels={this.state.p_labels} frequency={this.state.p_frequency} label_title={"Ups Frequency"}
                                        title={"Updown frequency on '" + this.state.subreddit + "' posts"} />

                                </Grid>
                                : null
                            }
                            {this.state.p_sentiment.length !== 0 ?
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={3}
                                    xs={12}
                                >
                                    <Sentiments value={this.state.p_sentiment} title={"Sentiments on your subreddit '" + this.state.subreddit + "' posts "} />

                                </Grid>
                                : null
                            }

                            {this.state.c_labels.length > 0 && this.state.c_frequency.length > 0 ?
                                <Grid
                                    item
                                    lg={8}
                                    md={12}
                                    xl={9}
                                    xs={12}
                                >
                                    <HashtagChart labels={this.state.c_labels} frequency={this.state.c_frequency} label_title={"Ups Frequency"}
                                        title={"Updown frequency on '" + this.state.subreddit + "' posts comments"} />

                                </Grid>
                                : null
                            }
                            {this.state.c_sentiment.length !== 0 ?
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={3}
                                    xs={12}
                                >
                                    <Sentiments value={this.state.c_sentiment} title={"Sentiments on your subreddit '" + this.state.subreddit + "' posts comments"} />

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

export default connect(mapStateToProps)(RedditAnalysis);