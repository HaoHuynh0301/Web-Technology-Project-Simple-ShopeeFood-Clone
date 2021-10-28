import React, { Component } from "react";
import {
    orangeColor
} from '../contants';
import {
    Link,
    Redirect,
    Route,
    useHistory ,
    withRouter
} from "react-router-dom";
import {
    Navigation,
    Footer
} from '../Components';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return(
            <div>
                <Navigation />
                <div style = {{
                    height: '520px'
                }}></div>
                <Footer />
            </div>
        );
    }
}

export default Home;