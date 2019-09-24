import React from 'react';
import './interaction.css'
import Grid from '@material-ui/core/Grid'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import { withStyles } from '@material-ui/styles'
import CommentContainer from './../../../Comment/Comment'

const styles = theme => ({
    button: {
        outline: "none",
        backgroundColor: 'inherit',
        decoration: "none",
        '&:hover': {
            color: 'lightblue',
            backgroundColor: ""
        }
    },
})

class Interact extends React.Component {

    render() {
        const {likes, classes} = this.props;
        let len = (likes) ? like.length : 0;

        return (
            <React.Fragment>
                <span className={classes.button} onClick={() => {alert("hello")}}>
                    {len > 0 ? len : ""}<ThumbUpAltIcon />
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {/* <span className={classes.button}><CommentIcon /></span> */}
                <CommentContainer />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Interact);