import React, { Component } from "react";
import {
    Navigation,
    Footer
} from '../Components';
import {
    blueColor,
    ipAddress
} from '../contants';
const axios = require('axios');
const localStorage = require('local-storage');

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: null,
            phonenumber: '',
            email: ''
        }
        this.handleChangeInformation = this.handleChangeInformation.bind(this);
        this.handleChangeInformation = this.handleChangeInformation.bind(this);
    }

    componentDidMount = () => {
        this.getUserInformation();
    }

    getUserInformation = () => {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/customer-infor/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data);
            this.setState({
                name: response.data.full_name,
                phonenumber: response.data.phone_number,
                email: response.data.email,
            })
        })
        .catch((error) => {
            console.log('Error');
        })
    }

    handleChangeInformation = () => {
        if(this.state.password === null) {
            alert('VUI LÒNG NHẬP MẬT KHẨU CẦN THAY ĐỔI!');
        } else {
            const token = localStorage.get('token');
            axios.post(`${ipAddress}/api/customer-infor/`, {
                full_name: this.state.name,
                email: this.state.email,
                phone_number: this.state.phonenumber,
                password: this.state.password
            } ,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                alert('CẬP NHẬT THÀNH CÔNG!');
            })
            .catch((error) => {
                alert('CẬP NHẬT KHÔNG THÀNH KHÔNG!');
            })
        }
    }

    mainView = () => {
        return(
            <div style = {{
                height: '520px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style = {{
                    height: '90%',
                    width: '40%',
                    border: 'solid 0.2px #e6e6e6',
                    boxShadow: '5px 10px 18px #888888'
                }}>
                    <div style = {{
                        paddingTop: '10px',
                        paddingLeft: '20px',
                        borderBottom: 'solid 0.5px #e6e6e6',
                    }}>
                        <p style = {{fontWeight: 'bold', fontSize: '20px'}}>Thông tin người dùng</p>
                    </div>
                    <div style = {{
                        paddingTop: '20px',
                        paddingLeft: '20px',
                        borderBottom: 'solid 0.5px #e6e6e6',
                        paddingBottom: '20px'
                    }}>
                        <p style = {{
                            fontWeight: 'bold',
                            color: blueColor,
                            marginBottom: '20px'
                        }}>Thay đổi thông tin</p>

                        {/* Edit information Wrapper */}
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}> 
                            <p style = {{marginRight: '133px', fontWeight: 'bold'}}>Tên *</p>
                            <input type = 'text' value = {this.state.name} onChange = {(event) => {
                                this.setState({
                                    name: event.target.value
                                })
                            }} style = {{
                                height: '30px',
                                borderRadius: '5px',
                                border: 'solid 0.5px grey',
                                padding: '5px'
                            }}></input>
                        </div>
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}> 
                            <p style = {{marginRight: '118px', fontWeight: 'bold'}}>Email *</p>
                            <input type = 'text' value = {this.state.email} onChange = {(event) => {
                                this.setState({
                                    email: event.target.value
                                })
                            }} style = {{
                                height: '30px',
                                borderRadius: '5px',
                                border: 'solid 0.5px grey',
                                padding: '5px'
                            }}></input>
                        </div>
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}> 
                            <p style = {{marginRight: '88px', fontWeight: 'bold'}}>Mật khẩu *</p>
                            <input type = 'password' value = {this.state.password} onChange = {(event) => {
                                this.setState({
                                    password: event.target.value
                                })
                            }} style = {{
                                height: '30px',
                                borderRadius: '5px',
                                border: 'solid 0.5px grey',
                                padding: '5px'
                            }}></input>
                        </div>
                        <button onClick = {this.handleChangeInformation} style = {{
                            border: 'solid 0.5px grey',
                            padding: '15px',
                            borderRadius: '20px',
                            backgroundColor: blueColor,
                            color: 'white',
                            height: '30px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginTop: '5px'
                        }}>Xác nhận thay đổi</button>
                    </div>
                    <div style = {{
                        paddingTop: '30px',
                        paddingLeft: '20px',
                    }}>
                        <p style = {{
                            fontWeight: 'bold',
                            color: blueColor,
                            marginBottom: '20px'
                        }}>Quản lý số điện thoại</p>
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}> 
                            <p style = {{marginRight: '60px', fontWeight: 'bold'}}>Số điện thoại *</p>
                            <input type = 'text' value = {this.state.phonenumber} onChange = {(event) => {
                                this.setState({
                                    phonenumber: event.target.value
                                })
                            }} style = {{
                                height: '30px',
                                borderRadius: '5px',
                                border: 'solid 0.5px grey',
                                padding: '5px'
                            }}></input>
                        </div>
                        <button onClick = {this.handleChangeInformation} style = {{
                                border: 'solid 0.5px grey',
                                padding: '15px',
                                borderRadius: '20px',
                                backgroundColor: blueColor,
                                color: 'white',
                                height: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                marginTop: '10px'
                            }}>Cập nhật số điện thoại</button>
                    </div>
                </div>
            </div>  
        );
    }

    render() {
        return(
            <div>
                <Navigation />
                {this.mainView()}
                <Footer />
            </div>
        );
    }
}

export default Profile;