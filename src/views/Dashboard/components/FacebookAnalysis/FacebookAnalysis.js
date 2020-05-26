import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Hashtags from './../Hashtags'
import Friends from './../Friends'
import Posts from './../Posts'
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import HashtagChart from './../HashtagChart'
import Sentiments from './../S_Doughnut';
import NQDoughnut from './../NQ_Doughnut';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { connect } from 'react-redux';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class FacebookAnalysis extends Component {

    constructor(props) {
        super(props)
        axios.post('/get_facebook_analysis', {
            user_id: this.props.id,
        }).then(response => {
            console.log(response.data)
            if (response.data.message) {
                this.setState({
                    message: response.data.message,
                    error_snackbar: true
                })
            }
            this.setState({
                friends: response.data.friends,
                posts_count: response.data.post_count == null ? 0 : response.data.post_count,
                hashtags_count: response.data.hashtags_count == null ? 0 : response.data.hashtags_count,
                user_name: response.data.user
            })
            let l = [], s_t = [], q_t = [], f = [], s_h = [], q_h = [];
            response.data.hashtags.forEach(element => {
                l.push(element.name)
                f.push(element.number)
            });

            if (response.data.s_positive !== 0 || response.data.s_negative !== 0 || response.data.s_neutral !== 0) {
                s_t.push(response.data.s_positive);
                s_t.push(response.data.s_neutral);
                s_t.push(response.data.s_negative);
            }
            if (response.data.q_true !== 0 || response.data.q_false !== 0) {
                q_t.push(response.data.q_true);
                q_t.push(response.data.q_false);
            }

            if (response.data.h_model !== null) {
                if (response.data.h_model.s_positive !== 0 || response.data.h_model.s_negative !== 0 || response.data.h_model.s_neutral !== 0) {
                    s_h.push(response.data.h_model.s_positive);
                    s_h.push(response.data.h_model.s_neutral);
                    s_h.push(response.data.h_model.s_negative);
                }
                if (response.data.h_model.q_true !== 0 || response.data.h_model.q_false !== 0) {
                    q_h.push(response.data.h_model.q_true);
                    q_h.push(response.data.h_model.q_false);
                }
                this.setState({
                    ...this.state,
                    page_name: response.data.h_model.name
                })
            }
            this.setState({
                labels: l,
                frequency: f,
                u_sentiment: s_t,
                u_question: q_t,
                p_sentiment: s_h,
                p_question: q_h
            })
            if(response.data.friends!=null){
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
        friends: null,
        posts_count: null,
        hashtags_count: null,
        user_name: null,
        page_name: null,
        labels: [],
        frequency: [],
        u_sentiment: [],
        u_question: [],
        p_sentiment: [],
        p_question: [],

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
                                : <Friends friends_following={"FRIENDS"} friends={this.state.friends} />
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
                            {this.state.u_sentiment.length !== 0 ?
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={3}
                                    xs={12}
                                >
                                    <Sentiments value={this.state.u_sentiment} title={"Sentiments on your timeline - " + this.state.user_name} />

                                </Grid>
                                : null
                            }
                            {this.state.u_question.length !== 0 ?
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={3}
                                    xs={12}
                                >
                                    <NQDoughnut value={this.state.u_question} title={"Questions on your timeline - " + this.state.user_name} />

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
                                    <Sentiments value={this.state.p_sentiment} title={"Sentiments on your page - " + this.state.page_name} />

                                </Grid>
                                : null
                            }
                            {this.state.p_question.length !== 0 ?
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={3}
                                    xs={12}
                                >
                                    <NQDoughnut value={this.state.p_question} title={"Questions on your page - " + this.state.page_name} />

                                </Grid>
                                : null
                            }
                        </>
                        : null}
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

export default connect(mapStateToProps)(FacebookAnalysis);