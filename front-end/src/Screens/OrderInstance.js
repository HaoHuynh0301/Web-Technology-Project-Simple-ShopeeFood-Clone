import React, { Component } from "react";
import {
    Navigation,
    Footer
} from '../Components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import storeIcon from '../assets/store.png';
import motorIcon from '../assets/motor.png';
import 'leaflet/dist/leaflet.css';
import {
    blueColor
} from '../contants';


class OrderInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    mainView = () => {
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