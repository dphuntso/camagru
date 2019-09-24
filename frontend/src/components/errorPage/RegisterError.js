
import React from 'react';

import Grid from '@material-ui/core/Grid'
import { withStyles, mergeClasses } from '@material-ui/styles';

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
    }
});


class RegisterError extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.body}>
                <Grid item>
                    Error Registering Your account! Sorry! 
                    <br />
                    Please Try again.
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(RegisterError);

