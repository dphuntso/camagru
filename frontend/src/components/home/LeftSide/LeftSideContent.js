
import React from 'react';
import '../sideContent.css'


const arr = ['LeftString1', 'LeftString2', 'LeftString3'];
class LeftSideContent extends React.Component {

    returnContents(tab) {
        let count = 0;
        return tab.map(item => <div className="sideContent" key={count++}><span>{item}</span></div>)
    }

    render() {
        return (
            <React.Fragment>
                {this.returnContents(arr)}
            </React.Fragment>
        );
    }
}

export default LeftSideContent;