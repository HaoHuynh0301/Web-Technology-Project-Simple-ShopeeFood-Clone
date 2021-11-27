import React, { Component } from "react";
import {
    orangeColor,
    ipAddress
} from '../contants';
import {
    Link,
    withRouter 
} from "react-router-dom";
import './css/register.css';
import background from '../assets/login-background.jpg';
const axios = require('axios');
const localStorage = require('local-storage');

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phoneNumber: '',
            email: '',
            username: '',
            pass1: '',
        }
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister = (event) => {
        event.preventDefault();
        axios.post(`${ipAddress}/api/register/`, {
            full_name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.pass1,
            phone_number: this.state.phoneNumber
        })
        .then((response) => {
            alert('ĐĂNG KÝ TÀI KHOẢN THÀNH CÔNG');
            
            this.props.history.push('/login');
        })
        .catch((error) => {
            alert('THÔNG TIN TÀI KHOẢN KHÔNG HỢP LỆ');
        })
    }

    render() {
        return(
            <div className = 'Container' style = {{
                backgroundImage: `url(${background})`
            }}>
                <div className = 'mainContentRegister'>
                    <h2 style = {{
                        marginBottom: '40px',
                        alignSelf: 'flex-start',
                        marginLeft: '95px',
                        marginBottom: '40px'
                    }}>Đăng ký</h2>
                    <form onSubmit = {this.handleRegister}>
                        <div style = {{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: "17px",
                                fontWeight: 'bold',
                                marginBottom: '10px'
                            }}>
                                Họ và tên *
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.name}
                                onChange = {(event) => {
                                    this.setState({
                                        name: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <div style = {{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: "17px",
                                fontWeight: 'bold',
                                marginBottom: '10px'
                            }}>
                                Số điện thoại *
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.phoneNumber}
                                onChange = {(event) => {
                                    this.setState({
                                        phoneNumber: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <div style = {{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: "17px",
                                fontWeight: 'bold',
                                marginBottom: '10px'
                            }}>
                                Email *
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.email}
                                onChange = {(event) => {
                                    this.setState({
                                        email: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <div style = {{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: "17px",
                                fontWeight: 'bold',
                                marginBottom: '10px'
                            }}>
                                Tên đăng nhập *
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.username}
                                onChange = {(event) => {
                                    this.setState({
                                        username: event.target.value
                                    });
                                }}
                            ></input>
                        </div>   
                        <div style = {{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: "17px",
                                fontWeight: 'bold',
                                marginBottom: '10px'
                            }}>
                                Mật khẩu *
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.pass1}
                                onChange = {(event) => {
                                    this.setState({
                                        pass1: event.target.value
                                    });
                                }}
                                type = 'password'
                            ></input>
                        </div>   
                        <input className = 'submitBtn' type = 'submit' value = 'Đăng ký'></input>
                    </form>
                    <div style = {{
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "center",
                        justifyContent: "center"
                    }}>
                        <p style = {{
                            fontWeight: 'bold'
                        }}>Bạn đã có tài khoản ? 
                            <Link
                                to = '/login'
                                style = {{
                                    color: orangeColor,
                                    marginLeft: 10
                                }}
                            >Bắt đầu mua sắm</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);