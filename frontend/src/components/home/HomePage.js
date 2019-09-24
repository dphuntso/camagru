
import React from 'react';
import './home.css'
import Feed from './feed/Feed';
import LeftSideContent from './LeftSide/LeftSideContent';
import RightSideContent from './RightSide/RightSideContent';

import { Grid } from '@material-ui/core';


class HomePage extends React.Component {
    render () {
        return (
            <Grid container justify={"center"} spacing={4}>
                <Grid item>
                {/* <Grid item className="leftsidebar"> */}
                    <LeftSideContent />
                    {/* I am SideBar.jlsjfsllsfjdlfjdslkajflkjlfsjdk <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br /> */}
                </Grid>
                {/* <Grid item className="sixty"> */}
                <Grid item >
                    <Feed />
                </Grid>
                <Grid item>
                {/* <Grid item className="rightsidebar"> */}
                    <RightSideContent />
                    {/* rightside */}
                    {/* I am SideBar.jlsjfsllsfjdlfjdslkajflkjlfsjdk <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br />
                    I am SideBar. <br /> */}
                </Grid>
            </Grid>
        );
    }
}

export default HomePage;