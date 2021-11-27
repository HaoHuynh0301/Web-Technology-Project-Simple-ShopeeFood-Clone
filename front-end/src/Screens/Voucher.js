import React, { Component } from "react";
import {
    Navigation,
    Footer
} from '../Components';
import {
    ipAddress,
    orangeColor
} from '../contants';
import noVoucherIcon from '../assets/novoucherIcon.png';
import voucherIcon from '../assets/voucherIcon.png';
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
        this.handleEndReached = this.handleEndReached.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
    }

    copyToClipboard = (e, code) => {
        navigator.clipboard.writeText(code);
        alert('Sao chép mã khuyến mãi thành công!');
    }

    handleEndReached = () => {
        console.log("load more");
    };


    mainView = () => {
        if(this.state.vouchers.length > 0) {
            const listVouchers = this.state.vouchers.map((item, index) => {
                return(
                    <div key = {index} style = {{
                        height: '70px',
                        width: '400px',
                        borderBottom: 'solid 1px grey',
                        display: 'flex',
                        flexDirection: 'row',
                        paddingBottom: '5px'
                    }}>
                        <img src = {voucherIcon} style = {{
                            height: '50px',
                            width: '50px'
                        }}></img>
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: "space-around",
                            marginLeft: '20px',
                            borderRight: 'solid 0.5px grey',
                            paddingRight: '5px'
                        }}>
                            <span style = {{
                                fontWeight: 'bold'
                            }}>Giảm trực tiếp {item.percentage}% vào tổng giá</span>
                            <span>Số lượng: {item.quantity}</span>
                        </div>
                        <button style = {{
                            marginLeft: '10px',
                            borderWidth: '0px',
                            backgroundColor: orangeColor,
                            height: '60px',
                            borderRadius: '30px',
                            fontSize: '15px',
                            fontWeight: 'bold'
                        }} onClick = {(e) => {
                            this.copyToClipboard(e, item.code);
                        }}>Sử dụng ngay</button>
                    </div>
                );
            });

           return(
                <div style = {{
                    height: '520px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f2f2f2'
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
                        marginTop: '20px',
                        backgroundColor: 'white'

                    }}>
                        <ScrollView style = {{
                            height: '90%'
                        }} onEndReached={this.handleEndReached}>
                            {listVouchers}
                        </ScrollView>
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