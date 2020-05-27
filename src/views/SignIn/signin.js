import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios'
import { connect } from 'react-redux';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?nature)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignInSide = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState(null);

    const verifyUser = () => {
        if (email.length === 0 || password.length === 0) {
            setMessage("Please enter the required fields");
            return;
        }
        axios.post('/login', {
            emailId: email,
            password: password,
        }).then(response => {
            console.log(response)
            props.saveUser(response.data.firstName + " " + response.data.lastName, response.data.id);
            history.push('/dashboard');
        }).catch(error => {
            console.log(error);
            setMessage("Sign in failed. Incorrect Email Address and Password.");
            return;
        })

    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <React.Fragment>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                        />
                        {message ? <Alert severity="error">{message}</Alert> : null}
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={verifyUser}
                            autoFocus
                        >
                            Sign In
                        </Button>
                    </React.Fragment>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link href="/sign-up" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        saveUser: (name, id) => dispatch({ type: 'saveuser', name: name, id: id })
    }
}

export default connect(null, mapDispatchToProps)(SignInSide);