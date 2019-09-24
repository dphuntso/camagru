
import React from 'react';
import { connect } from 'react-redux';
import Registerform from './Registerform'
import { history } from '../../router/AppRouter.js'

import { 
    Grid,
    Typography,
    Container,
    Paper
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    body: {
        display: 'flex'
    },
    root: {
        width: '100vw',
        height: '10vh',
        backgroundColor: 'red'
    },
    paper: {
        padding: 20,
        marginTop: 20
    }
});

class Register extends React.Component {

    render() {
        const { classes, loggedIn } = this.props;
        if (loggedIn) {
            history.push('/');
        }
        return (
            <Container className={classes.body} component="main" maxWidth="xs">
                <Grid>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <Registerform />
                    </Paper>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = ({auth}) => {
    const { loggedIn } = auth
    return ({
        loggedIn
    })
}
export default connect(mapStateToProps)(withStyles(styles)(Register));
