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

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return(
            <div>Home</div>
        );
    }
}