import React from 'react';
import { Link } from 'react-router-dom'
import regeneratorRuntime from "regenerator-runtime";
import { history } from '../../router/AppRouter.js'
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types'

const request = require('request');
import { 
    Button,
    TextField,
    Grid,
    Typography,
    Container,
    Paper
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    body: {
        display: 'block'
    },
    root: {
        width: '100vw',
        height: '10vh',
        backgroundColor: 'red'
    },
    paper: {
        padding: 20,
        marginTop: 20
    },
    signin: {
        width: '100%',
        borderRadius: '5px'
    },
    register: {
        marginTop: '10px'
    },
    error: {
        color: 'red'
    }
});

class Login extends React.Component {
    state = {
        emailState: false,
        passwordState: false,
        userNameState: false,
        passwordMessage: '',
        emailMaessage: '',
        userNameMessage: '',
        errormessage: ''
    }

    testmail(email) {
        if (/\S+@\S+\.\S+/.test(email)) {
            this.setState({
                emailState: true,
                emailMaessage: 'not a valid email'
            })
        } else {
            this.setState({
                emailState: false,
                emailMaessage: ''
            })
        }
    }

    testpassword(password) {
        let i = 0;
        while (password != undefined && password != null && password[i]) {
            i++;
        }
        if (i < 7) {
            this.setState({
                passwordMessage: 'password length is too short',
                passwordState: true
            })
        } else {
            this.setState({
                passwordState: false,
                passwordMessage: ''
            })
        }
    }

    async testuserName(userName) {
        if (!userName) {
            this.setState({
                userNameState: true,
                userNameMessage: 'must pick a unique userName'
            })
        } else {
            // let flag = await checkUsername(userName);
            let flag = false;
            if (flag) {
                this.setState({
                    userNameState: true,
                    userNameMessage: 'userName already exists, please use another'
                })
            } else {
                this.setState({
                    userNameState: false,
                    userNameMessage: ' '
                })
            }
        }
    }
    
    setuserState(flag, str) {
        this.setState({
            userNameState: flag,
            userNameMessage: str 
        })
    }

    async onSubmit(e) {
        e.preventDefault();
        let target = e.target;
        let password = target.password.value
        let userName = target.userName.value
        if (!userName || userName.length < 4) {
            this.setState({
                userNameState: true,
                userNameMessage: 'userName cannot be empty nor less than 6 characters in length'
            });
            return ;
        }
        if (!password || password.length < 8) {
            this.setState({
                passwordState: true,
                passwordMessage: 'password cannot be empty nor less than 8 characters in length'
            });
            return ;
        }
        this.props.login(userName, password);
    }

    render() {

        const { classes, loading, loggedIn, errormessage } = this.props;
        if (loggedIn) {
            history.push('/');
        }
        return (
            <Container component="main" maxWidth="xs">
                <Grid>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <form onSubmit={this.onSubmit.bind(this)}>
                            {
                                (errormessage) && 
                                    <span className={classes.error}>* {errormessage}</span>
                            }
                            {
                                (this.state.userNameState) && 
                                    <span className={classes.error}>* {this.state.userNameMessage}</span>
                            }
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="userName"
                                label="userName or email"
                                id="userName"
                                autoComplete="userName"
                            />
                            {
                                (this.state.passwordState) && 
                                    <span className={classes.error}>* {this.state.passwordMessage}</span>
                            }
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Grid container justify="center">
                                <Grid item>
                                    <Button variant="contained" color="secondary" disabled={loading} type="submit" >Sign In</Button>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.register}>
                                <Grid item xs>
                                    <Link to="/resetPassword" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Container>
        );
    }
}

// Login.propTypes = {
//     login: React.PropTypes.func.isRequired
// }

const mapStateToProps = ({ auth }) => {
    const { loggedIn, loading, errormessage } = auth;
    return ({
        loggedIn,
        loading,
        errormessage
    });
}

export default connect(mapStateToProps, { login })(withStyles(styles)(Login));