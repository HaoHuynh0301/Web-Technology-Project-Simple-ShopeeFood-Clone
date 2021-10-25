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
    Navigation
} from '../Components';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return(
            <div>
                <Navigation />
                Home
            </div>
        );
    }
}

export default Home;