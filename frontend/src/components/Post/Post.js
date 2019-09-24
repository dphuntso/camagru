import React from 'react';

import { Grid, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
    center: {
        display: 'block',
        margin: '0 auto'
    },
    none: {
        display: 'none',
        margin: '0 auto'
    },
    button: {
        display: 'block',
        margin: '0 auto',
        padding: '5px',
        width: 'auto'
    },
    take: {
        display: 'block',
        margin: '0 auto',
        padding: '4px',
        width: 'auto',
        font: '12px'
    },
    output: {
        minHeight: '100px'
    }
})

class Post extends React.Component {

    state = {
        picture: null,
        takePicture: false,
        fileSrc: "",
        fileName: ""
    }

    cancel() {
        this.setState({
            fileSrc: "",
            fileName: "",
            takePicture: true,
        }, () => this.init())
    }

    onChange(input) {
        if (input && input.target.files[0]) {
            let reader = new FileReader();

            reader.onload = (e) => {
                this.setState({
                    fileSrc: e.target.result,
                    fileName: e.target.fileName
                }, () => console.log(this.state))
            }
            reader.readAsDataURL(input.target.files[0]);
        }
    }

    takeSnapShot() {
        console.log('inside take pictyre')
        let canvas = document.getElementById('canvas');
        let video = document.getElementById('player');
        // let image = document.getElementById('output');

        let width = video.videoWidth;
        let height = video.videoHeight;
        canvas.width = width;
        canvas.height = height;
        
        let context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, width, height);

        let imageDataUrl = canvas.toDataURL('image/png');
        // image.setAttribute('src', imageDataUrl);
        this.setState({
            fileSrc: imageDataUrl
        }, () => console.log(this.state))
    }

    init() {
        navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);

        navigator.getMedia(
            {video: true, audio: false},
            (stream) => {
                let video = document.getElementsByTagName('video')[0];
                video.srcObject = stream;
                video.play();
                // let canvas = document.getElementsByTagName('canvas')[0];
                // canvas = video.src;
            },
            (error) => {
                console.log('why is there error \n *** => ',error)
            },
        )
    }

    cancelPicture() {
        this.setState({
            takePicture: false
        })
    }
    
    takePicture () {
        this.setState({
            takePicture: true,
            fileSrc: ""
        }, () => {
            if (this.takePicture) {
                this.init()
            }
        })
    }

    render () {
        const { classes } = this.props;
        return (
            <Grid container justify="center" alignItems="center">
                {
                    (this.state.takePicture && !this.state.fileSrc) &&
                        <Grid item xs={7}>
                            <video style={{maxWidth: '100%', maxHeight: "100%"}} id="player"/>
                        </Grid>
                }
                {
                    (!this.state.takePicture && !this.state.fileSrc) &&

                        <Grid item xs={7}>
                            <Grid container justify="center" alignItems="center">
                                <Grid item xs={12}>
                                    <button disabled className={classes.center}>Take a Picture OR Upload One</button>
                                </Grid>
                                <Grid item xs={12} style={{minHeight: "100px"}}>
                                </Grid>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={3}>
                                    <Button className={classes.take} variant="contained" color="secondary" onClick={() => this.takePicture()}>
                                        Take Picture
                                    </Button>
                                </Grid>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={3}>
                                    <input id="uploadImage" className={classes.none} type="file" accept="image/*" onChange={(e) => this.onChange(e)}/>
                                    <label id="updloadImage" htmlFor="uploadImage">
                                        <Button className={classes.take} component="span" style={{width: '130px'}} variant="contained" color="secondary">
                                            Upload Picture
                                        </Button>
                                    </label>
                                </Grid>
                                <Grid item xs={2}></Grid>
                            </Grid>
                        </Grid>

                }
                <Grid item xs={5}>
                    filter
                </Grid>
                {
                    (this.state.takePicture && !this.state.fileSrc) && 
                        <React.Fragment>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={1}>
                                <Button className={classes.button} variant="contained" color="secondary" onClick={() => this.takeSnapShot()} type="submit">
                                    CAPTURE
                                </Button>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={1}>
                                <Button className={classes.button} variant="contained" color="secondary" onClick={() => this.cancelPicture()} type="submit">
                                    CANCEL
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={5}>
                            </Grid>
                        </React.Fragment>
                }
                {
                    (this.state.fileSrc) && 
                    <React.Fragment>
                        <Grid item xs={7}>
                            <img className={classes.output} id="output" src={this.state.fileSrc} />
                        </Grid>
                        <Grid item xs={5}>
                        </Grid>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={1}>
                            <Button className={classes.button} variant="contained" color="secondary">Save</Button>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={1}>
                            <Button className={classes.button} variant="contained" color="secondary" onClick={() => this.cancel()}>Cancel</Button>
                        </Grid>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={5}>
                        </Grid>
                    </React.Fragment>
                }
                <canvas id="canvas"></canvas>
            </Grid>
        );
    }
}

export default withStyles(styles)(Post);