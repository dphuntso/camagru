
import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetPassword } from '../../actions/auth';

import { 
    TextField,
    Grid,
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
    },
    button: {
        width: '100px',
        padding: 5
    }
});

class ResetPassword extends React.Component {

    state = {
        emailState: false,
        emailMessage: '',
        confirmEmailState: false,
        confirmEmailMessage: false,
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

    testConfirmEmail(email, confirmEmail) {
        if (!email) {
            this.setState({
                emailState: true,
                emailMessage: 'confirm Email Cannot be empty'
            })
            return false;
        }
        if (email != confirmEmail) {
            this.setState({
                confirmEmailState: true,
                confirmEmailMessage: 'confirmEmail is different from Email'
            })
            return false;
        }
        this.setState({
            confirmEmailState: false,
            confirmEmaildMessage: '',
        })
        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        let target = e.target;
        let email = target.email.value;
        let confirmEmail = target.confirmEmail.value
        if (!this.testmail(email)) {
            return ;
        }
        if (!this.testConfirmEmail(email, confirmEmail)) {
            return ;
        }
        if ((this.state.emailState || this.state.passwordState || this.state.userNameState || this.state.confirmPasswordState)) {
            return ;
        }
        this.props.resetPassword(email, confirmEmail);
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
        const { loading, errormessage, classes } = this.props
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    {
                        (errormessage) && 
                            <span className={classes.error}>*{errormessage}</span>
                    }
                    {
                        (this.state.email) && 
                            <span className={classes.error}>*{this.state.emailMessage}</span>
                    }
                    <TextField
                        onChange={(e) => this.onChange(e)}
                        value={this.state.email}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="email"
                        type="email"
                        id="email"
                        autoComplete="current-email"
                    />
                    {
                        (this.state.confirmEmailState) && 
                            <span className={classes.error}>*{this.state.confirmEmaildMessage}</span>
                    }
                    <TextField
                        onChange={(e) => this.onChange(e)}
                        value={this.state.confirmEmail}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmEmail"
                        label="email"
                        type="email"
                        id="confirmEmail"
                        autoComplete="current-email"
                    />
                    <Grid container justify="center">
                        <Grid item>
                            <Button className={classes.button} variant="contained" color="secondary" disabled={loading} type="submit" >Send Link</Button>
                        </Grid>
                    </Grid>
                </form>
                <Grid container>
                    <Grid item xs>
                        <Link to="/" variant="body2">
                            Back To HomePage?
                        </Link>
                    </Grid>
                </Grid>
            </div>

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

export default connect(mapStateToProps, {resetPassword})(withStyles(styles)(ResetPassword));
