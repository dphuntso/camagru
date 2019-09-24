
import React from 'react';
import './feed.css';
import Interact from './Interaction/Interact';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';


const styles = (theme) => ({
    root: {
        maxWidth: '700px'
    },
    feedItem: {
        background: 'lightblue'
    }
})

class Feed extends React.Component {

    getFeeds(classes) {
        let tab = ['camagruImage.jpg', 'justdoit.jpg'];
        let count = 0;
        return tab.map((img) => {
            return this.feed(img, count++, classes)
        });
    }

    feed(img, index, classes) {
        return (
            <Grid container className={classes.feedItem} key={index} direction="row" justify="space-around" alignItems="center">
                <Grid item xs={10} className="img">
                    <img alt="image" src={`http://localhost:9100/camagru/public/images/${img}`} />
                </Grid>
                <Grid item xs={10}>
                    <Interact />
                </Grid>
            </Grid>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid className={classes.root}>
                {this.getFeeds(classes)}

            </Grid>
        );
            {/* <div className="feedBody">
                {this.getFeeds()}
            </div> */}
    }
}


export default withStyles(styles)(Feed);