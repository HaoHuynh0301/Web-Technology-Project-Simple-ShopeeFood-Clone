import React, { Component } from "react";
import {
    Navigation,
    Footer
} from '../Components';
import {
    blueColor,
    ipAddress
} from '../contants';
import accountIcon from '../assets/accountIcon.png';
import noVoucherIcon from '../assets/novoucherIcon.png';
const axios = require('axios');
const localStorage = require('local-storage');

class Voucher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vouchers: null
        }
        
        this.getVoucherInformation = this.getVoucherInformation.bind(this);
    }

    mainView = () => {
        return(
            <div style = {{
                height: '520px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <span style = {{
                    fontSize: '30px',
                    fontWeight: 'bold',
                    // marginTop: '10px'
                }}>MÃ KHUYẾN MÃI</span>
                {this.emptyVoucherView()}
            </div>
        );
    }

    emptyVoucherView = () => {
        return(
            <div style = {{
                height: '70%',
                width: '60%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'solid 0.5px grey',
                marginTop: '20px'
            }}>
                <img src = {noVoucherIcon} style= {{
                    height: '140px',
                    height: '140px'
                }}></img>
                <span style = {{
                    fontWeight: 'bold',
                    marginTop: '20px'
                }}>Bạn chưa có mã khuyến mãi</span>
            </div>
        );
    }

    getVoucherInformation = () => {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/cus-vouchers/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                vouchers: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    componentDidMount = () => {
        this.getVoucherInformation();
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

export default Voucher;