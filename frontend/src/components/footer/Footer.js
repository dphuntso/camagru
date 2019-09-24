import React from 'react';
import { Link } from 'react-router-dom'

import './footer.css';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


// const styles = theme => ({
//     // body: {
//     //     display: 'block'
//     // },
//     root: {

//         width: '100vw',
//         height: '5vh',
//         backgroundColor: '#03a9f4',
//         display: 'flex'
//     },
// });

class Footer extends React.Component {
    render () {
        const { classes } = this.props;
        return (
            <footer className="footer">
                some footer text
                {/* <div className="logo-container">
                    <Link to='/'><img className="logo" alt="logo" src="http://localhost:9100/camagru/public/logos/camagruLogo.svg" /></Link>
                </div>
                <nav className="nav-links">
                    <Link className="nav-link" to='/topPost'>latest</Link>
                    <Link className="nav-link" to='/topPost'>Popular</Link>
                    <Link className="nav-link" to='/about'>About</Link>
                    <Link className="nav-link" to='/register'>Register</Link>
                    <Link className="nav-link" to='/login'>login</Link>
                    <Link></Link>
                </nav> */}
            </footer>
        );
    }
}

export default (Footer);