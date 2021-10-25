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

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div>
                Register
            </div>
        );
    }
}

export default Register;