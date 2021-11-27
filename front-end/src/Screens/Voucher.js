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
const axios = require('axios');
const localStorage = require('local-storage');

class Voucher extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
                <span>MÃ KHUYẾN MÃI</span>
            </div>
        );
    }

    emptyVoucherView = () => {
        return(
            <div>
                
            </div>
        );
    }

    getVoucherInformation = () => {

    }

    componentDidMount = () => {

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