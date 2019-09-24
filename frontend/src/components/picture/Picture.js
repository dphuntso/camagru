import React from 'react';
import './picture.css'

class Picture extends React.Component {

    addEvent() {
        let capture = document.getElementById('capture');
        console.log('capture => ', capture);
        capture.addEventListener("click", this.takeSnapShot);
    }

    takeSnapShot() {
        console.log('inside take pictyre')
        let canvas = document.getElementById('canvas');
        let video = document.getElementById('player');
        let image = document.getElementById('output');

        let width = video.videoWidth;
        let height = video.videoHeight;
        canvas.width = width;
        canvas.height = height;
        
        let context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, width, height);

        let imageDataUrl = canvas.toDataURL('image/png');
        image.setAttribute('src', imageDataUrl);


    }

    picture() {
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
    componentDidMount(){
        this.addEvent();
        this.picture();
    }

    render() {
        return (
            <div id="camera">
                <div>
                    <video id="player"/>
                </div>
                <div>
                    <img id="output"/>
                </div>
                <div>
                    <button id="capture">CAPTURE</button>
                    <canvas id="canvas"></canvas>
                </div>
            </div>
        );
    }
}

export default Picture;