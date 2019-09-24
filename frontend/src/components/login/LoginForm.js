import React from 'react';
import { Link } from 'react-router-dom'
import regeneratorRuntime from "regenerator-runtime";
import { history } from '../../router/AppRouter.js'
import { signIn } from '../../actions/user';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

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
    }
});

class Login extends React.Component {
    state = {
        emailState: false,
        passwordState: false,
        userNameState: false,
        passwordMessage: '',
        emailMaessage: '',
        userNameMessage: ''
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

    getUser(userName, password) {
        if (!userName) {
            this.setuserState(true, 'userName Cannot be empty')
            return;
        }
        console.log(userName, '   *** ', password)
        request('http://localhost:9100/camagru/login', {
            method: 'POST',
            json: true,
            body: {
                userName: userName,
                password: password
            }
        }, (err, res, body) => {
            if (err || body.error) {
                return true;
            }
            console.log(body)
            this.setuserState(false, '')
            console.log('here')
            // history.push('/profile');
        });
    }

    async onSubmit(e) {
        e.preventDefault();
        let target = e.target;
        let email = target.email.value;
        // this.testmail(email)
        let password = target.password.value
        this.testpassword(password);
        let userName = target.userName.value
        this.getUser(userName, password)
        if (this.state.emailState || this.state.passwordState || this.state.userNameState) {
            return ;
        }


        // return false;
    }

    render() {
        const { classes, loading } = this.props;
        return (
                <Grid>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form onSubmit={this.onSubmit.bind(this)}>
                            {
                                (this.state.emailState) && 
                                    <span>* {this.state.emailMaessage}</span>
                            }
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            {
                                (this.state.userNameState) && 
                                    <span>* {this.state.userNameMessage}</span>
                            }
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="userName"
                                label="user name"
                                id="userName"
                                autoComplete="userName"
                            />
                            {
                                (this.state.passwordState) && 
                                    <span>* {this.state.passwordMessage}</span>
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
                                    {/* <button className={classes.signin}>
                                        <Typography component="h5" variant="h5">
                                            Sign in
                                        </Typography>
                                    </button> */}
                                    <Button variant="contained" color="secondary" disabled={loading} type="submit" >Sign In</Button>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.register}>
                                <Grid item xs>
                                    <Link to="/" variant="body2">
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
        );
    }
}

// Login.propTypes = {
//     login: React.PropTypes.func.isRequired
// }

const mapStateToProps = ({ auth }) => {
    const { loggedIn, userId, loading } = auth;
    return ({
    loggedIn,
        userId,
        loading
    });
}

export default connect(mapStateToProps, { login })(withStyles(styles)(Login));