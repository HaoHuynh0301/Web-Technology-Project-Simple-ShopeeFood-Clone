import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import *  as ReactBoostrap from 'react-bootstrap';
import {
    orangeColor,
    blackColor,
    ipAddress
} from '../contants';
import {
    Link,
    withRouter 
} from "react-router-dom";
import auth from "../auth";
import shopIcon from '../assets/shopIcon.png';
import historyIcon from '../assets/historyIcon.png';
import accountIcon from '../assets/accountIcon.png';
import orderIcon from '../assets/orderIcon.png'
import voucherIcon from '../assets/voucherIcon.png';
const axios = require('axios');
const localStorage = require('local-storage');


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avaLink: ''
        }
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
            if(response.data.avatar !== null) {
                this.setState({
                    avaLink: `${ipAddress}${response.data.avatar}`
                });
            } else {
                this.setState({
                    avaLink: accountIcon
                });
            }
            
        })
        .catch((error) => {
            console.log('Error');
        })
    }

    componentDidMount = () => {
        this.getUserInformation();
    }

    render() {
        console.log(this.state.avaLink);
         return(
            <ReactBoostrap.Navbar collapseOnSelect expand="lg" bg={orangeColor} variant="light" style = {{backgroundColor: orangeColor}}>
                <ReactBoostrap.Container>
                    <ReactBoostrap.Navbar.Brand style = {{marginRight: '50px'}}><img src = {shopIcon} style = {{
                        height: '40px',
                        width: '40px',
                        borderRadius: '50px',
                        marginRight: '5px'
                    }}/><Link style = {{textDecoration: "none", color: blackColor, fontWeight: 'bold'}} to = '/'>ThuanaoFood</Link></ReactBoostrap.Navbar.Brand>
                    <ReactBoostrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <ReactBoostrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBoostrap.Nav className="me-auto">
                        <ReactBoostrap.Nav.Link style = {{
                            marginRight: '10px'
                        }}><Link style = {{textDecoration: "none", color: blackColor}} to = '/'>Đồ ăn</Link></ReactBoostrap.Nav.Link>
                        <ReactBoostrap.Nav.Link style = {{
                            marginRight: '10px'
                        }}><Link style = {{textDecoration: "none", color: blackColor}} to = '/thuc-pham'>Thực phẩm</Link></ReactBoostrap.Nav.Link>
                        <ReactBoostrap.Nav.Link style = {{
                            marginRight: '10px'
                        }}><Link style = {{textDecoration: "none", color: blackColor}} to = '/bia'>Bia</Link></ReactBoostrap.Nav.Link>
                        <ReactBoostrap.Nav.Link href="#pricing"></ReactBoostrap.Nav.Link>
                        </ReactBoostrap.Nav>
                        <ReactBoostrap.Nav>
                        <ReactBoostrap.NavDropdown style = {{
                            fontWeight: 'bold',
                            width: '130px'
                        }} title={
                            <img src = {this.state.avaLink} style = {{
                                height: '35px',
                                width: '35px',
                                borderRadius: '50px'
                            }}/>
                        } id="collasible-nav-dropdown">
                            <ReactBoostrap.NavDropdown.Item><img src = {accountIcon} style = {{
                                height:'30px',
                                width: '30px',
                                marginRight: '5px'
                            }} /><Link style = {{textDecoration: "none", color: blackColor}} to = '/profile'>Cập nhật tài khoản</Link></ReactBoostrap.NavDropdown.Item>
                            <ReactBoostrap.NavDropdown.Item><img src = {historyIcon} style = {{
                                height:'30px',
                                width: '30px',
                                marginRight: '5px'
                            }} /><Link style = {{textDecoration: "none", color: blackColor}} to = '/history-order'>Lịch sử đơn hàng</Link></ReactBoostrap.NavDropdown.Item>
                            <ReactBoostrap.NavDropdown.Item><img src = {orderIcon} style = {{
                                height:'30px',
                                width: '30px',
                                marginRight: '5px'
                            }} /><Link style = {{textDecoration: "none", color: blackColor}} to = '/order-instance'>Đơn hàng hiện tại</Link></ReactBoostrap.NavDropdown.Item>
                            <ReactBoostrap.NavDropdown.Item><img src = {voucherIcon} style = {{
                                height:'30px',
                                width: '30px',
                                marginRight: '5px'
                            }} /><Link style = {{textDecoration: "none", color: blackColor}} to = '/voucher'>Ví Voucher</Link></ReactBoostrap.NavDropdown.Item>
                            <ReactBoostrap.NavDropdown.Item><button style = {{
                                borderWidth: '0px',
                                backgroundColor: 'auto',
                                width: '200px',
                                borderRadius: '20px',
                                backgroundColor: orangeColor
                            }} onClick = {() => {
                                auth.logout(() => {
                                    this.props.history.push('/login');
                                })
                            }}>Đăng xuất</button></ReactBoostrap.NavDropdown.Item>
                        </ReactBoostrap.NavDropdown>
                        </ReactBoostrap.Nav>
                    </ReactBoostrap.Navbar.Collapse>
                </ReactBoostrap.Container>
            </ReactBoostrap.Navbar>
        );
    }
   
}

export default withRouter(Navigation);