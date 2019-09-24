import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


import { logout, changeCurrentPage } from '../../actions/auth';

import './Header.css';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    
    // body: {
    //     display: 'block'
    // },
    // root: {
    //     width: '100vw',
    //     height: '5vh',
    //     backgroundColor: '#03a9f4',
    //     display: 'flex'
    // },
    block: {
        display: "flex",
        margin: "auto",
        "background-color": "white",
        "align-items": "center",
        top: 0,
        position: "relative",
        "box-sizing": "border-box",
        top: 0,
        position: 'fixed',
        width: '95%',
        // display: 'block'
    },
    fixer: {
        width: "95%",
        margin: 'auto',
        height: '60px',
    }
});

class Header extends React.Component {

    logout () {
        this.props.logout(this.props.userId);
    }

    render () {
        const { classes, loggedIn } = this.props;
        return (
            <React.Fragment>
                <Grid container className={classes.block}>
                    <Grid item xs={1}>
                        <Link to='/'>
                            <img className="logo" alt="logo" src="http://localhost:9100/camagru/public/logos/camagruLogo.svg" />
                        </Link>
                    </Grid>
                    <Grid item xs={5}>
                        {" "}
                    </Grid>
                    <Grid item xs={6}>
                        <nav className="nav-links">
                            <Link className="nav-link" to='/'>Home</Link>
                            <Link className="nav-link" to='/topPost'>Popular</Link>
                            <Link className="nav-link" to='/about'>About</Link>
                            {(!loggedIn) && <Link className="nav-link" to='/register'>Register</Link>}
                            {
                                (loggedIn) ? 
                                    (<Link className="nav-link" to='#' onClick={this.logout.bind(this)}>Logout</Link>) : 
                                        (<Link className="nav-link" to='/login'>Login</Link>)
                            }
                            {/* {(!loggedIn) && <Link className="nav-link" to='/login'>Login</Link>} */}
                        </nav>
                    </Grid>
                </Grid>
                <Grid container className={classes.fixer}>

                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({auth}) => {
    const { loggedIn, userId, currentPage } = auth;
    return ({
        userId,
        loggedIn,
        currentPage
    })
}

export default connect(mapStateToProps, {logout, changeCurrentPage})(withStyles(styles)(Header));
// export default connect(mapStateToProps, {register})(withStyles(styles)(RegisterForm));