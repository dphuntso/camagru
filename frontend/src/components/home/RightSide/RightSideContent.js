
import React from 'react';
import '../sideContent.css'

const arr = ['rightString1', 'rightString2', 'rightString3'];
class RightSideContent extends React.Component {

    returnContents(tab) {
        let count = 0;
        return tab.map(item => <div className="sideContent" key={count++}><span>sadfsdf</span></div>)
    }

    render() {
        return (
            <React.Fragment>
                {this.returnContents(arr)}
            </React.Fragment>
        );
    }
}

export default RightSideContent;