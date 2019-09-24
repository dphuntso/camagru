import React from 'react'
import {withStyles} from '@material-ui/styles';
import { Dialog, DialogTitle, Grid} from '@material-ui/core';

const styles = theme => ({
    dialogContent: {
        minHeight: '30vh',
        overflowY: 'auto'
    }
})

const ModalWindow = (props) => {
    const { classes, title, isDialogOpened, handleClose, children } = props;
    {/* maxWidth={"none"} */}
    return (
        <Dialog
            fullWidth
            open={isDialogOpened}
            onClose={handleClose}
            onClick={(e) => {console.log("dialog"); e.stopPropagation(); handleClose()}}
        >
        <Grid onClick={(e) => {console.log("before dialog"); e.stopPropagation();}}>
            Hello from ModalWindow
            {children}
        </Grid>
        </Dialog>
    );
}

export default withStyles(styles)(ModalWindow);