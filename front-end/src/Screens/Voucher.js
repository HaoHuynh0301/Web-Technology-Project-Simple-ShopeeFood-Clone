import React, { Component } from "react";
import {
    Navigation,
    Footer
} from '../Components';
import {
    ipAddress
} from '../contants';
import noVoucherIcon from '../assets/novoucherIcon.png';
import { ScrollView } from "@cantonjs/react-scroll-view";
const axios = require('axios');
const localStorage = require('local-storage');

class Voucher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vouchers: []
        }
        
        this.getVoucherInformation = this.getVoucherInformation.bind(this);
    }

    mainView = () => {
        if(this.state.vouchers.length > 0) {
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
                    }}>MÃ KHUYẾN MÃI</span>
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

                    </div>
                </div>
           );
        } else {
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
                    }}>MÃ KHUYẾN MÃI</span>
                    {this.emptyVoucherView()}
                </div>
            );
        }
        
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