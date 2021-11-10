import React, { Component } from "react";
import {
    orangeColor,
    ipAddress
} from '../contants';
import {
    Link,
    Redirect,
    Route,
    useHistory ,
    withRouter
} from "react-router-dom";
import { Home } from ".";
import auth from "../auth";
import './css/login.css';
const axios = require('axios');
const localStorage = require('local-storage');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleSignIn = (event) => {
        // auth.login(() => {
        //     this.props.history.push('/');
        // });
        event.preventDefault();
        axios.post(`${ipAddress}/api/login/`, {
            email: this.state.email,
            password: this.state.password
        })
        .then((response) => {
            localStorage.set('token', response.data.access);
            auth.login(() => {
                this.props.history.push('/');
            })
            this.setState({
                email: '',
                password: '',
            });
        })
        .catch((error) => {
            alert('Tài khoản hoặc mật khẩu của bạn không đúng!');
        });
    }

    render() {
        return(
            <div className = 'Container'>
                <div className = 'mainContent'>
                    <div className  = 'signInTitleWrapper'>
                        <h1>Đăng nhập</h1>
                    </div>
                    <form onSubmit = {this.handleSignIn}>
                        <div class = 'inputWrapper'>
                            <p style = {{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                marginLeft: "12px",
                                fontSize: "20px"
                            }}>Email</p>
                            <input type = 'text' className = 'inputStyle' 
                                value = {this.state.email}
                                onChange = {(event) => {
                                    this.setState({
                                        email: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <div class = 'inputWrapper'>
                            <p style = {{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                marginLeft: "12px",
                                fontSize: "20px"
                            }}>Mật khẩu</p>
                            <input type = 'password' className = 'inputStyle'
                                value = {this.state.password}
                                onChange = {(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <input type = 'submit' value = 'Đăng nhập' className = 'submitSignInBtn'></input>
                    </form>
                    <div style = {{
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "center",
                        justifyContent: "center",
                    }}>
                        <p>Bạn chưa có tài khoản ? 
                            <Link
                                to = '/register'
                                style = {{
                                    color: orangeColor,
                                    marginLeft: 10
                                }}
                            >Đăng ký ngay bây giờ</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);