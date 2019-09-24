
import React from 'react';
import { connect } from 'react-redux'
import { history } from '../../router/AppRouter'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/styles';
import { confirmAccount } from '../../actions/auth';
import {
    Button
} from '@material-ui/core';


const styles = theme => ({
    body: {
        backgroundColor: 'green',
        alignItem: 'center'
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
    progress: {
        // margin: theme.spacing(2)
        margin: 3
    }
});

class ConfirmationPage extends React.Component {
    
    state = {
        isChecked: false,
        togo: ''
    }

    onclick() {
        console.log(this.state)
        if (this.state.togo == 'home') {
            history.push('/');
        } else {
            history.push('/' + this.state.togo)
            this.state.togo = ''
        }
    }

    homebutton(str) {
        let loading = this.props.loading;
        console.log('loading => ', loading)
        console.log('str => ', str)
        this.state.togo = str;
        if (!loading) {
            return (
                <React.Fragment>
                    click <Button variant="contained" color="secondary" disabled={loading} onClick={this.onclick.bind(this)} value={str}>here</Button> to go to home page
                </React.Fragment>
            );
        }
    }

    check(hash) {
        if (this.state.isChecked == false) {
            this.state.isChecked = true;
            this.props.confirmAccount(hash)
        }
    }
    render() {
        const { loading, registerStatus } = this.props
        const hash = this.props.match.params.hash;
        this.check(hash)
        return (
            <Grid container>
                <Grid>
                    {(loading) && 'Confirming Account. Please wait ....'}
                    {(!loading) && (registerStatus) && 'Account Confirmed Successfully. Please log in'}
                    {(!loading) && (!registerStatus) && 'Something went wrong. please try again.. '}
                    <br />
                    <br />
                    <br />
                    <br />
                    {this.homebutton('home')}
                    <br />
                    <br />
                    <br />
                    <br />
                    {this.homebutton('login')}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = ({auth}) => {
    const { loading, confirmLinkStatus } = auth;
    return ({
        loading,
        registerStatus: confirmLinkStatus,
    })
}

export default connect(mapStateToProps, {confirmAccount})(withStyles(styles)(ConfirmationPage));

