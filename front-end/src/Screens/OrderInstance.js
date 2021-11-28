import React, { Component } from "react";
import {
    Navigation,
    Footer
} from '../Components';
import {
    Link
} from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import storeIcon from '../assets/store.png';
import 'leaflet/dist/leaflet.css';
import {
    blueColor,
    orangeColor,
    ipAddress
} from '../contants';
import { RoutingMachine } from ".";
import plusIcon from '../assets/plus-icon.png';
import minusIcon from '../assets/minus-icon.png';
const axios = require('axios');
const localStorage = require('local-storage');


class OrderInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instanceOrder: {

            },
            listFoodsInstance: null,
            shippingAddress: null,

            // Current location
            Latitude: null,
            Longitude: null,
            totalCast: 0,
            loaded: false,
            voucher: '',
            applyingVoucher: null
        }
        this.handleGetOrder = this.handleGetOrder.bind(this);
        this.getDeliveredCoordinate = this.getDeliveredCoordinate.bind(this);
        this.getInformation = this.getInformation.bind(this);
        this.handleConfirmDelivered = this.handleConfirmDelivered.bind(this);
        this.handleUseVoucher = this.handleUseVoucher.bind(this);
    }

    handleUseVoucher = () => {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/voucher?code=${this.state.voucher}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            let tmpCast = (1 - Number(response.data.percentage)/100) * this.state.totalCast
            this.setState({
                totalCast: tmpCast,
                applyingVoucher: this.state.voucher,
                voucher: ''
            });
        })
        .catch((error) => {
            alert('Voucher không hợp lệ');
            this.setState({
                voucher: ''
            })
        })
    }

    getDeliveredCoordinate = () => {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/shipping-address/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                shippingAddress: response.data
            });
        })
        .catch((error) => {
            console.log('ERROR');
        });
    }

    getInformation = () => {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/cart/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(async (response) => {
            this.setState({
                instanceOrder: response.data.order,
                listFoodsInstance: response.data.items
            });
            let tmpContext = response.data.items;
            for (let i = 0; i < tmpContext.length; i = i + 1) {
                axios.get(`${ipAddress}/api/get-product/${tmpContext[i].product}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((secondresponse) => {
                    this.setState({
                        totalCast: this.state.totalCast + response.data.items[i].get_order_detail_total,
                    });
                })
                .catch((error) => {
                    console.log('Error');
                });
            }
        })
        .catch((error) => {
            console.log('KHÔNG CÓ DỮ LIỆU');
        });
    }

    componentDidMount () {
        this.getInformation();
        // this.interval = setInterval(() => {
        //     this.getInformation();
        // }, 10000);
        this.getDeliveredCoordinate();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleGetOrder = () => {
        const token = localStorage.get('token');
        let totalCast = this.state.totalCast;
        navigator.geolocation.getCurrentPosition((position) => {
            axios.post(`${ipAddress}/api/checkout/`, {
                lattitude: position.coords.latitude,
                longitude: position.coords.longitude,
                cast: totalCast,
                voucher: this.state.applyingVoucher
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    instanceOrder: response.data.order,
                    listFoodsInstance: response.data.items
                });
                this.getDeliveredCoordinate();
            }).
            catch((error) => {
                alert(error);
            });
        });
    }

    emptyInstanceOrders = () => {
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
                <Link to = '/' style = {{
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
                    color: 'black',
                    borderColor: orangeColor,
                    fontWeight: 'bold'
                }}>Bắt đầu mua hàng ngay</Link>
            </div>
        );
    }

    handleConfirmDelivered = () => {
        const token = localStorage.get('token');
        axios.post(`${ipAddress}/api/receive-order/${this.state.instanceOrder.id}/`, {

        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            alert('XÁC NHẬN ĐƠN HÀNG ĐÃ ĐƯỢC THANH TOÁN!');
            this.setState({
                instanceOrder: {},
                listFoodsInstance: null
            })
        })
        .catch((error) => {
            alert('XÁC NHẬN ĐƠN HÀNG KHÔNG THÀNH CÔNG! VUI LÒNG THỬ LẠI SAU!');
        })
    }

    mainView = () => {
        if(this.state.instanceOrder !== null) {
            if(this.state.instanceOrder.is_checkout === true) {
                if(this.state.shippingAddress === null) {
                    return(
                        <div style = {{
                            height: '520px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style = {{
                                border: 'solid 0.2px #e6e6e6',
                                boxShadow: '5px 10px 18px #888888',
                                height: '90%',
                                width: '70%'
                            }}>
                                Hello
                            </div>
                            <div style = {{
                                width: '360px',
                                border: 'solid 0.5px grey',
                                marginLeft: '20px',
                                borderRadius: '10px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style = {{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <img src = {storeIcon} style = {{
                                        height: '30px',
                                        width: '30px'
                                    }}></img>
                                    <p style = {{
                                        marginLeft: '5px',
                                        fontWeight: 'bold',
                                        color: blueColor
                                    }}>{this.state.instanceOrder.name_of_product}</p>
                                </div>
                                <p>Số 14 đường Quản Trọng Hoàng, Hưng Lợi, Ninh Kiều</p>
                                <div style = {{
                                    height: '0.5px',
                                    backgroundColor: 'grey'
                                }}></div>
                                <div style = {{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <p>Trạng thái: </p><p style = {{
                                        color: 'green',
                                        fontWeight: 'bold',
                                        marginLeft: '10px'
                                    }}>Đang giao</p>
                                </div>
                                <div style = {{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <p>Tổng tiền: </p><p style = {{
                                        fontWeight: 'bold',
                                        marginLeft: '10px'
                                    }}>{this.state.instanceOrder.cast} vnđ</p>
                                </div>
                                <div style = {{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <p>Mã đơn hàng: </p><p style = {{
                                        fontWeight: 'bold',
                                        marginLeft: '10px'
                                    }}>DSAJIH321</p>
                                </div>
                            </div>
                        </div>
                    );
                } else if(this.state.shippingAddress !== null) {
                    console.log(this.state.instanceOrder);
                    return(
                        <div style = {{
                            height: '520px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style = {{
                                border: 'solid 0.2px #e6e6e6',
                                boxShadow: '5px 10px 18px #888888',
                                height: '95%',
                                width: '75%'
                            }}>
                                <MapContainer style = {{
                                    height: '100%',
                                    width: '100%',
                                    border: 'solid 0.5px grey'
                                }} center={[this.state.shippingAddress.lattitude, this.state.shippingAddress.longitude]} zoom={9} scrollWheelZoom={true}>
                                    <TileLayer
                                        attribution='Vị trí đơn hàng'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <RoutingMachine  
                                        delivered = {[this.state.instanceOrder.lattitude, this.state.instanceOrder.longitude]}
                                        current = {[this.state.shippingAddress.lattitude, this.state.shippingAddress.longitude]} 
                                    />
                                </MapContainer>
                            </div>
                            <div style = {{
                                width: '360px',
                                border: 'solid 0.5px grey',
                                marginLeft: '10px',
                                borderRadius: '10px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style = {{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <img src = {storeIcon} style = {{
                                        height: '30px',
                                        width: '30px'
                                    }}></img>
                                    <p style = {{
                                        marginLeft: '5px',
                                        fontWeight: 'bold',
                                        color: blueColor
                                    }}>MÃ SỐ ĐƠN HÀNG: {this.state.instanceOrder.id}</p>
                                </div>
                                <div style = {{
                                    height: '0.5px',
                                    backgroundColor: 'grey'
                                }}></div>
                                <div style = {{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <p>Trạng thái: </p><p style = {{
                                        color: 'green',
                                        fontWeight: 'bold',
                                        marginLeft: '10px'
                                    }}>Đang giao</p>
                                </div>
                                <div style = {{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <p>Tổng tiền: </p><p style = {{
                                        fontWeight: 'bold',
                                        marginLeft: '10px'
                                    }}>{this.state.instanceOrder.cast} vnđ</p>
                                </div>
                                <button style = {{
                                    border: 'solid 0.5px grey',
                                    borderRadius: '10px',
                                    backgroundColor: orangeColor,
                                    // fontWeight: 'bold'
                                }} onClick = {() => {
                                    this.handleConfirmDelivered();
                                }}>Xác nhận thanh toán</button>
                            </div>
                        </div>
                    );
                }
            } else if(this.state.listFoodsInstance !== null) {
                const item = this.state.listFoodsInstance.map((item, index) => {
                    return(
                        <div key = {index} style = {{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <p style = {{fontWeight: 'bold', width: '20%'}}>{item.name_of_product}</p> 
                                <div style = {{
                                    width: '65%'
                                }}>
                                    <button style = {{
                                        border: 'none',
                                        backgroundColor: '#FFF'
                                    }} onClick = {() => {
                                        const token = localStorage.get('token');
                                        axios.post(`${ipAddress}/api/order/`, {
                                            order_detail_id: item.id,
                                            status: 2
                                        }, {
                                            headers: {
                                                'Content-Type': 'application/json',
                                                Authorization: `Bearer ${token}`
                                            }
                                        })
                                        .then((response) => {
                                            console.log(response.data.order);
                                            this.setState({
                                                instanceOrder: response.data.order,
                                                listFoodsInstance: response.data.items,
                                                totalCast: 0
                                            });
                                            let tmpContext = response.data.items;
                                            for (let i = 0; i < tmpContext.length; i = i + 1) {
                                                axios.get(`${ipAddress}/api/get-product/${tmpContext[i].product}/`, {
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        Authorization: `Bearer ${token}`
                                                    }
                                                })
                                                .then((secondresponse) => {
                                                    this.setState({
                                                        totalCast: this.state.totalCast + response.data.items[i].get_order_detail_total,
                                                    });
                                                })
                                                .catch((error) => {
                                                    console.log('Error');
                                                });
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        })
                                    }}>
                                        <img src = {minusIcon} style = {{
                                            height: '20px',
                                            width: '20px'
                                        }}></img>
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button style = {{
                                        border: 'none',
                                        backgroundColor: '#FFF'
                                    }} onClick = {() => {
                                        const token = localStorage.get('token');
                                        axios.post(`${ipAddress}/api/order/`, {
                                            order_detail_id: item.id,
                                            status: 1
                                        }, {
                                            headers: {
                                                'Content-Type': 'application/json',
                                                Authorization: `Bearer ${token}`
                                            }
                                        })
                                        .then((response) => {
                                            this.setState({
                                                instanceOrder: response.data.order,
                                                listFoodsInstance: response.data.items,
                                                totalCast: 0
                                            });
                                            let tmpContext = response.data.items;
                                            for (let i = 0; i < tmpContext.length; i = i + 1) {
                                                axios.get(`${ipAddress}/api/get-product/${tmpContext[i].product}/`, {
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        Authorization: `Bearer ${token}`
                                                    }
                                                })
                                                .then((secondresponse) => {
                                                    this.setState({
                                                        totalCast: this.state.totalCast + response.data.items[i].get_order_detail_total,
                                                    });
                                                })
                                                .catch((error) => {
                                                    console.log('Error');
                                                });
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        })
                                    }}>
                                        <img src = {plusIcon} style = {{
                                            height: '20px',
                                            width: '20px'
                                        }}></img>
                                    </button>
                                </div>
                                <p style = {{
                                    width: '15%'
                                }}>{item.get_order_detail_total} vnđ</p>
                            </div>
                            <div style = {{
                                height: '0.5px',
                                border: 'solid 0.5px grey'
                            }}></div>
                        </div>
                    );
                })
                return(
                    <div style = {{
                        height: '520px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}> 
                        <div style = {{
                            border: 'solid 0.2px #e6e6e6',
                            boxShadow: '5px 10px 18px #888888',
                            height: '90%',
                            width: '40%',
                            padding: '20px'
                        }}>
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'column' 
                            }}>
                                <p style = {{
                                    fontWeight: 'bold',
                                    fontSize: '25px',
                                    marginBottom: '35px'
                                }}>Chi tiết đơn hàng</p>
                                {item}
                                <div style = {{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    backgroundColor: '#f2f2f2',
                                    height: '30px',
                                    marginTop: '10px',
                                    padding: '5px',
                                    justifyContent: 'space-between'
                                }}>
                                    <span style = {{
                                        fontWeight: 'bold'
                                    }}>Mã khuyến mãi</span>
                                    <input style = {{
                                        border: 'solid 0.5px grey',
                                        borderRadius: '20px',
                                        width: '150px',
                                        padding: '5px'
                                    }} onChange = {(event) => {
                                        this.setState({
                                            voucher: event.target.value
                                        });
                                    }}type = 'text' value = {this.state.voucher}></input>
                                    <button style = {{
                                        fontSize: '12px',
                                        borderWidth: '0px',
                                        backgroundColor: '#00e600',
                                        borderRadius: '5px'
                                    }} onClick = {() => {
                                        this.handleUseVoucher();
                                    }} >Áp dụng</button>
                                </div>
                                <div style = {{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between' ,
                                    marginTop: '20px'
                                }}>
                                    <p style = {{
                                        fontWeight: 'bold'
                                    }}>Tổng cộng: </p>
                                    <p>{this.state.totalCast} vnđ</p>
                                </div>
                                <button onClick = {() => {
                                    this.handleGetOrder();
                                }} style = {{
                                    fontWeight: 'bold',
                                    color: 'white',
                                    backgroundColor: orangeColor,
                                    border: 'none',
                                    height: '36px',
                                    borderRadius: '10px'
                                }}>Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                );    
            } else {
                return(
                    <div style = {{
                        height: '520px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {this.emptyInstanceOrders()}
                    </div>
                );
            }
        } 
    }

    render() {
        let item = [];
        if(this.state.listFoodsInstance !== null) {
            item = this.state.listFoodsInstance.map((item, index) => {
                return(
                    <div key = {index} style = {{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <p style = {{fontWeight: 'bold', width: '20%'}}>{item.name_of_product}</p> 
                            <div style = {{
                                width: '65%'
                            }}>
                                <span>{item.quantity}</span>    
                            </div>
                            <p style = {{
                                width: '15%'
                            }}>{item.get_order_detail_total} vnđ</p>
                        </div>
                        <div style = {{
                            height: '0.5px',
                            border: 'solid 0.5px grey'
                        }}></div>
                    </div>
                );
            })
        }
        return(
            <div>
                <Navigation />
                {this.mainView()}
                <Footer/>
            </div>
        );
    }
}

export default OrderInstance;