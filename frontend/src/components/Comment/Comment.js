import React from 'react';
import {connect} from 'react-redux';
import { Grid } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';

import ModalWindow from './../Modal/ModalWindow';
import ModalWindowBase from './../Modal/ModalWindowBase';

class CommentContainer extends ModalWindowBase {
    render () {
        const {isDialogOpened} = this.state;
        return (
            <React.Fragment>

                <ModalWindow isDialogOpened={isDialogOpened} handleClose={() => this.handleClose()} onClick={(e) => e.stopPropagation()}>
                    <Grid container>
                        <Grid item xs={12}>
                            adsgadsfdsfsdafdsfdsfdafdsafdsafdsafdsafdsfdsafdsfdsafdsfdasfadfdsfda
                        </Grid>
                        <Grid item xs={12}>
                            <span onClick={() => this.handleClose()}>close</span>
                        </Grid>
                        <Grid item xs={12}>
                            b
                        </Grid>
                        <Grid item xs={12}>
                            c
                        </Grid>
                        <Grid item xs={12}>
                            d
                        </Grid>
                    </Grid>
                </ModalWindow>
                <span className={"button"} onClick={() => {console.log("in comment");this.handleOpen();}}><CommentIcon /></span>
            </React.Fragment>
        );
    }
}

export default connect(null, null)(CommentContainer);