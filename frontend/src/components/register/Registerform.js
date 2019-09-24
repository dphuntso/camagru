
import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../../actions/auth';

import { 
    TextField,
    Grid,
    Typography,
    Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    signin: {
        width: '100%',
        borderRadius: '5px'
    },
    register: {
        justify: 'center',
        alignItem: 'center',
        marginTop: '10px'
    },
    error: {
        color: 'red'
    }
});

class RegisterForm extends React.Component {

    state = {
        emailState: false,
        userNameState: false,
        passwordState: false,
        confirmPasswordState: false,
        passwordMessage: '',
        emailMessage: '',
        userNameMessage: '',
        confirmPasswordMessage: '',
    }

    testmail(email) {
        if (!email) {
            this.setState({
                emailState: true,
                emailMessage: 'email Cannot be empty'
            })
            return false;
        }
        if (/\S+@\S+\.\S+/.test(email)) {
            // this.checkEmail(email).then(res => resolve(''));
        } else {
            this.setState({
                emailState: true,
                emailMessage: 'not a valid email'
            })
            return false;
        }
        return true;
    }

    testpassword(password) {
        if (!password) {
            this.setState({
                confirmPasswordState: true,
                confirmPasswordMessage: 'password Cannot be empty'
            })
            return false;
        }
        let i = 0;
        let symbols = "~`!#$@%^&*+=-[]\\\';,/{}|\":<>?";
        let symbolflag = false;
        while (password != undefined && password != null && password[i]) {
            if (!symbolflag && symbols.indexOf(password[i]) != -1) {
                symbolflag = true;
            }
            i++;
        }
        if (i < 8) {
            this.setState({
                passwordMessage: 'password length is too short.',
                passwordState: true
            })
            return false;
        } else if (!symbolflag) {
            this.setState({
                passwordMessage: 'password must contain at least one special characters',
                passwordState: true
            })
            return false;
        }else {
            this.setState({
                passwordState: false,
                passwordMessage: ''
            })
        }
        return true;
    }

    testConfirmPassword(password, Password) {
        if (!password) {
            this.setState({
                confirmPasswordState: true,
                confirmPasswordMessage: 'confirm Password Cannot be empty'
            })
            return false;
        }
        if (password != Password) {
            this.setState({
                confirmPasswordState: true,
                confirmPasswordMessage: 'confirm Password is different from password'
            })
            return false;
        }
        this.setState({
            confirmPasswordState: false,
            confirmPasswordMessage: ''
        })
        return true;
    }

    testuserName(userName) {
        if (!userName) {
            this.setState({
                userNameState: true,
                userNameMessage: 'must pick a unique userName'
            })
            return false;
        } else {
            if (userName.length < 4) {
                this.setState({
                    userNameState: true,
                    userNameMessage: 'Username must contain atleast 4 characters'
                })
                return false;
            } else {
                this.setState({
                    userNameState: false,
                    userNameMessage: ''
                })
            }
            // this.checkUsername(userName).then(res => resolve(''));
        }
        return true;
    }
    
    setuserState(flag, str) {
        this.setState({
            userNameState: flag,
            userNameMessage: str 
        })
    }

    // checkUsername(userName) {
    //     return (new Promise((resolve, reject) => {
    //         if (!userName) {
    //             this.setuserState(true, 'userName Cannot be empty')
    //             resolve({});
    //             return ;
    //         }
    //         request('http://localhost:9100/camagru/profile/checkUsername', {
    //             method: 'POST',
    //             json: true,
    //             body: {
    //                 userName: userName
    //             }
    //         }, (err, res, body) => {
    //             if (err){
    //             }
    //             else if (body.error) {
    //                 this.setuserState(true, body.message)
    //             } else {
    //                 this.setuserState(false, '')
    //             }
    //             resolve({});
    //         });

    //     }));
    // }

    onSubmit(e) {
        e.preventDefault();
        let target = e.target;
        let email = target.email.value;
        let userName = target.userName.value
        let password = target.password.value
        let confirmPassword = target.confirmPassword.value
        if (!this.testmail(email)) {
            return ;
        }
        if (!this.testuserName(userName)) {
            return ;
        }
        if (!this.testpassword(password)) {
            return ;
        }
        if (!this.testConfirmPassword(confirmPassword, password)) {
            return ;
        }
        // if ((this.state.emailState || this.state.passwordState || this.state.userNameState || this.state.confirmPasswordState)) {
        //     return ;
        // }
        this.props.register({ email, userName, password, confirmPassword}).then(response => {
            if (response.error) {
                this.setState({
                    ...this.state,
                    ...response
                })
            }
        });
    }

    onChange(e) {
        // e.preventDefault();
        let state = this.state;
        state[e.target.name] = state[e.target.value];
        this.setState({
            ...state
        })
    }

    render() {
        const { classes, loading, errormessage } = this.props
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                {
                    (this.state.emailState) && 
                        <span className={classes.error}>*{this.state.emailMessage}<br /></span>
                }
                {
                    (errormessage) && 
                        <span className={classes.error}>*{errormessage}</span>
                }
                <TextField
                    onChange={(e) => this.onChange(e)}
                    value={this.state.email}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                {
                    (this.state.userNameState) && 
                        <span className={classes.error}>*{this.state.userNameMessage}</span>
                }
                <TextField
                    onChange={(e) => this.onChange(e)}
                    value={this.state.userName}
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
                        <span className={classes.error}>*{this.state.passwordMessage}</span>
                }
                <TextField
                    onChange={(e) => this.onChange(e)}
                    value={this.state.password}
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
                {
                    (this.state.confirmPasswordState) && 
                        <span className={classes.error}>*{this.state.confirmPasswordMessage}</span>
                }
                <TextField
                    onChange={(e) => this.onChange(e)}
                    value={this.state.confirmPassword}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                />
                <Grid container justify="center">
                    <Grid item>
                        {/* <button disabled={loading}> button</button>
                        <button className={classes.signin} disabled={loading}>
                            <Typography component="h5" variant="h5">
                                Register
                            </Typography>
                        </button>  */}
                        <Button variant="contained" color="secondary" disabled={loading} type="submit" >Register</Button>
                    </Grid>
                </Grid>
                <Grid container className={classes.register}>
                    {/* <Grid item xs>
                        <Link to="/" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid> */}
                    <Grid item>
                        <Link to="/login" variant="body2">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

const mapStateToProps = ({auth}) => {
    const { loading, errormessage } = auth;
    return ({
        loading,
        errormessage
    })
}

// const mapDispatchToProps = dispatch => {
//     return bindActionCreators({
//             register
//         }, dispatch)
// }

// export default connect(mapStateToProps, {mapDispatchToProps})(withStyles(styles)(RegisterForm));


export default connect(mapStateToProps, {register})(withStyles(styles)(RegisterForm));
