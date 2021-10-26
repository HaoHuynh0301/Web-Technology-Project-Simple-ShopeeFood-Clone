import React, { Component } from "react";
import {
    orangeColor,
    fontSize
} from '../contants';
import {
    Link,
} from "react-router-dom";
import './css/register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phoneNumber: '',
            email: '',
            username: '',
            pass1: '',
            pass2: ''
        }
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister = () => {

    }

    render() {
        return(
            <div className = 'Container'>
                <div className = 'mainContentRegister'>
                    <h1 style = {{marginBottom: '40px'}}>Đăng ký</h1>
                    <form onSubmit = {this.handleRegister}>
                        <div style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize,
                            }}>
                                Họ và tên
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
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize
                            }}>
                                Số điện thoại
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
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize
                            }}>
                                Email
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
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize
                            }}>
                                Tên đăng nhập
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
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize
                            }}>
                                Mật khẩu
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.pass1}
                                onChange = {(event) => {
                                    this.setState({
                                        pass1: event.target.value
                                    });
                                }}
                            ></input>
                        </div>   
                        <div style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize
                            }}>
                                Xác nhận mật khẩu
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.pass2}
                                onChange = {(event) => {
                                    this.setState({
                                        pass2: event.target.value
                                    });
                                }}
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
                        <p>Bạn đã có tài khoản ? 
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

export default Register;