import React, { Component } from "react";
import {
    Link
} from 'react-router-dom';
import {
    Navigation,
    Footer
} from '../Components';
import {
    orangeColor
} from '../contants';

class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historyOrders: []
        }
    }

    emptyHistoryOrders = () => {
        return(
            <div style = {{
                height: '90%',
                width: '60%',
                border: 'solid 0.2px #e6e6e6',
                boxShadow: '5px 10px 18px #888888',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                Bạn không có đơn hàng
                <Link to = '/home' style = {{
                    height: '50px',
                    width: '200px',
                    border: 'solid 0.5px grey',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textDecoration: "none",
                    borderRadius: '10px',
                    marginTop: '10px',
                    color: 'black'
                }}>Bắt đầu mua hàng ngay</Link>
            </div>
        );
    }

    mainView = () => {
        return(
            <div style = {{
                height: '635px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {this.emptyHistoryOrders()}
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

export default OrderHistory;