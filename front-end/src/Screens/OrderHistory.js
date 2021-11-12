import React, { Component } from "react";
import {
    Link
} from 'react-router-dom';
import {
    Navigation,
    Footer
} from '../Components';
import {
    ipAddress,
    orangeColor
} from '../contants';
const axios = require('axios');
const localStorage = require('local-storage');

class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historyOrders: [

            ]
        }

        this.handleReOrder = this.handleReOrder.bind(this);
        this.getHistoryOrders = this.getHistoryOrders.bind(this);
    }

    handleReOrder = (id) => {
        alert(id)
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

    componentDidMount = () => {
        this.getHistoryOrders();
    }

    getHistoryOrders = () => {
        //delivered-orders/
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/delivered-orders/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data);
            this.setState({
                historyOrders: response.data
            });
        })
        .catch((error) => {
            console.log('Error');
        })
    }

    mainView = () => {
        if(this.state.historyOrders.length > 0) {
            const listHistoryOrder = this.state.historyOrders.map((item, index) => {
                return(
                    <div key = {index} style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        // justifyContent: 'space-arundo',
                        borderBottom: 'solid 0.5px #e6e6e6',
                        paddingBottom: '5px',
                        marginTop: '10px'
                    }} key = {index}>
                        <p style = {{
                            marginRight: '100px',
                            marginLeft: '50px'
                        }}>{item.id}</p>
                        <p>{item.date_ordered}</p>
                        <p style = {{
                            marginLeft: '120px',
                            marginRight: '100px',
                        }}>{item} vnđ</p>
                        <button onClick = {() => {
                            this.handleReOrder(item.id);
                        }} style = {{
                            border: 'solid 0.5px grey',
                            padding: '5px',
                            height: '30px',
                            width: '120px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '5px'
                        }}>Re-order</button>
                    </div>
                );
            })
            return(
                <div style = {{
                    height: '520px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f2f2f2',
                }}>
                    <p style = {{
                        fontWeight: 'bold',
                        color: orangeColor,
                        fontSize: '25px'
                    }}>NotShoppeFood</p>

                    {/* History Order Wrapper */}
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'column',
                        border: 'solid 0.2px #e6e6e6',
                        boxShadow: '5px 10px 18px #888888',
                        width: '60%',
                        height: '70%',
                        padding: '20px'
                    }}>
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <p style = {{
                                marginLeft: '40px',
                                fontWeight: 'bold'
                            }}>STT</p>
                            <p style = {{
                                marginLeft: '100px',
                                fontWeight: 'bold'
                            }}>Thời gian</p>
                            <p style = {{
                                marginLeft: '250px',
                                fontWeight: 'bold'
                            }}>Tổng tiền</p>
                            <p style = {{
                                marginLeft: '130px',
                                fontWeight: 'bold'
                            }}>Trạng thái</p>
                        </div>
                        {listHistoryOrder}
                    </div>
                </div>
            );
        } else {
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