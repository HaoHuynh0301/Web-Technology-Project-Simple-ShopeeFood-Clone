import React, { Component } from "react";
import {
    Navigation,
    Footer
} from '../Components';
import {
    useLocation
} from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import storeIcon from '../assets/store.png';
import motorIcon from '../assets/motor.png';
import 'leaflet/dist/leaflet.css';
import {
    blueColor,
    orangeColor,
    ipAddress
} from '../contants';
import LoadingGif from '../assets/loading.gif';
const axios = require('axios');
const localStorage = require('local-storage');


class OrderInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instanceOrder: {

            },
            listFoodsInstance: [
               
            ],

            // Current location
            Latitude: null,
            Longitude: null,
            totalCast: null
        }
        // this.handleGetOrder = this.handleGetOrder.bind(this);
        this.getDriverCoordinate = this.getDriverCoordinate.bind(this);
        this.getInformation = this.getInformation.bind(this);
        this.setProductName = this.setProductName.bind(this);
    }

    getDriverCoordinate = () => {
        //Code here
    }

    setProductName = () => {
        const token = localStorage.get('token');
        if(this.state.listFoodsInstance.length !== 0) {
            let tmpContext = this.state.listFoodsInstance;
            for (let i = 0; i < tmpContext.length; i++) {
                axios.get(`${ipAddress}/api/get-product/${tmpContext[i].product}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    tmpContext[i].product = response.data;
                })
                .catch((error) => {
                    console.log('Error');
                });
            }
            console.log(tmpContext);
            this.setState({
                listFoodsInstance: tmpContext
            });
        }
        
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
            console.log(response.data.order);
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
                    tmpContext[i].product = secondresponse.data;
                })
                .catch((error) => {
                    console.log('Error');
                });
            }
            // console.log(tmpContext);
            this.setState({
                listFoodsInstance: tmpContext
            });
        })
        .catch((error) => {
            console.log('KHÔNG CÓ DỮ LIỆU');
        })
    }

    componentDidMount () {
        this.interval = setInterval(() => {
            this.getDriverCoordinate();
        }, 2000);
        this.getInformation();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    

    handleGetOrder = () => {
        const token = localStorage.get('token');
        let lattitude = null;
        let longitude = null;
        navigator.geolocation.getCurrentPosition(function(position) {
            // lattitude = position.coords.latitude;
            // longitude = position.coords.longitude;
            axios.post(`${ipAddress}/api/checkout/`, {
                lattitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                this.getInformation();
            }).
            catch((error) => {
                alert('XÁC NHẬN ĐƠN HÀNG KHÔNG THÀNH CÔNG!');
            })
        });
    }

    mainView = () => {
        if(this.state.instanceOrder != null) {
            if(this.state.instanceOrder.is_checkout === true) {
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
                            <MapContainer style = {{
                                height: '100%',
                                width: '100%',
                                border: 'solid 0.5px grey'
                            }} center={[14.058324, 108.277199]} zoom={8} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='Vị trí đơn hàng'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[21.0245, 105.84117]}>
                                    <Popup>
                                        Vị trí giao dự kiến
                                    </Popup>
                                </Marker>
                            </MapContainer>
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
                                }}>Mì SO - Lòng đào</p>
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
                                }}>70.000 vnđ</p>
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
            } else if(this.state.instanceOrder.is_checkout === false) {
                const item = this.state.listFoodsInstance.map((item, index) => {
                    return(
                        <div key = {index} style = {{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <p style = {{fontWeight: 'bold'}}>{item.product} - {item.quantity}</p> <p>{item.get_order_detail_total} vnđ</p>
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
                                    fontWeight: 'bold'
                                }}>Chi tiết đơn hàng</p>
                                {item}
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
                                    this.handleGetOrder()
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
                
            }
        } else {
            return(
                <div style = {{
                    height: '520px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img style = {{
                        height: '50px',
                        width: '50px'
                    }} src = {LoadingGif}></img>
                </div>
            );
        }
    }

    render() {
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