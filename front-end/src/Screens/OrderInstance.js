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
    orangeColor
} from '../contants';
import LoadingGif from '../assets/loading.gif';
const axios = require('axios');


class OrderInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instanceOrder: {
                id: '1',
                status: 2,
            },
            listFoodsInstance: [
                {
                    'id': 1,
                    'name': 'Mì xào giòn',
                    'description': 'Ngon say lalalala',
                    'categories:': 'Mì, thịt bò, bông cải xào',
                    'price': 20000
                },
                {
                    'id': 2,
                    'name': 'Mì xào giòn',
                    'description': 'Ngon say lalalala',
                    'categories:': 'Mì, thịt bò, bông cải xào',
                    'price': 40000
                }
            ],

            // Current location
            Latitude: null,
            Longitude: null
        }
        this.handleGetOrder = this.handleGetOrder.bind(this);
        this.getDriverCoordinate = this.getDriverCoordinate.bind(this);
    }

    getDriverCoordinate = () => {
        //Code here
    }

    componentDidMount () {
        this.interval = setInterval(() => {
            this.getDriverCoordinate();
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleGetOrder = () => {
        let tmpContext = {
            id: '1',
            status: 1,
        }
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
        this.setState({
            instanceOrder: tmpContext
        });
    }

    mainView = () => {
        if(this.state.instanceOrder != null) {
            if(this.state.instanceOrder.status === 1) {
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
            } else if(this.state.instanceOrder.status === 2) {
                const item = this.state.listFoodsInstance.map((item, index) => {
                    return(
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <p style = {{fontWeight: 'bold'}}>{item.name}</p> <p>{item.price} vnđ</p>
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
                                    <p>100000 vnđ</p>
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