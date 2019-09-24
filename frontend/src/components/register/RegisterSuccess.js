
import React from 'react';

import Grid from '@material-ui/core/Grid'
import { withStyles, mergeClasses } from '@material-ui/styles';


const styles = theme => ({
    // body: {
    //     backgroundColor: 'green',
    //     alignItem: 'center'
    // },
});


class RegisterSuccess extends React.Component {
    render() {
        // const { classes } = this.props;
        return (
            <div>
                <div>
                    Registration Successfull. Please check your email to confirm your Account.
                </div>
            </div>
        );
    }
}

// export default withStyles(styles)(RegisterSuccess);
export default RegisterSuccess;

