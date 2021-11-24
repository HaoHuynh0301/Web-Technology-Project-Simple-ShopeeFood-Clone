import React, { Component } from "react";
import {
    Navigation,
    Footer
} from '../Components';
import heartIcon from '../assets/heart.png';
import { 
    orangeColor ,
    ipAddress
} from "../contants";
import {
    Modal,
    Button
} from 'react-bootstrap';
const axios = require('axios');
const localStorage = require('local-storage');

class FoodDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodInformation: {
            },
            isShow: false
        }
        this.handleOrder = this.handleOrder.bind(this);
        this.getProductInformation = this.getProductInformation.bind(this);
    }

    handleOrder = () => {
        this.setState({
            isShow: true
        })
    }

    componentDidMount = () => {
        this.getProductInformation();
    }

    getProductInformation = () => {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/get-product/${this.props.match.params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                foodInformation: response.data
            })
        })
        .catch((error) => {
            alert('CÓ LỖI TRONG QUÁ TRÌNH LẤY DỮ LIỆU!');
        })
    }

    handleAddToCard = () => {
        const token = localStorage.get('token');
        axios.post(`${ipAddress}/api/add-to-cart/`, {
            product_id: this.state.foodInformation.id,
            action: "add"
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            alert('THÊM VÀO GIỎ HÀNG THÀNH CÔNG!');
            this.setState({
                isShow: false
            });
        })
        .catch((error) => {
            alert('THÊM VÀO ĐƠN HÀNG KHÔNG THÀNH CÔNG!');
        })
    }

    mainView = () => {
        return(
            <div style = {{
                height: '520px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '90%',
                    width: '70%',
                    border: 'solid 0.2px #e6e6e6',
                    boxShadow: '5px 10px 18px #888888',
                    padding: '30px',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>

                    {/* Image of Food Wrapper */}
                    <div>
                        <img style = {{
                            height: '350px',
                            width: '480px',
                            borderRadius: '10px',
                            boxShadow: '5px 10px 18px #888888',
                        }} src = {`http://192.168.1.3:8000${this.state.foodInformation.image}`}></img>
                        <p style = {{
                            fontWeight: 'bold',
                            marginTop: '20px'
                        }}>Phí dịch vụ: 0% | Phục vụ bởi NotShopeeFood</p>
                    </div>
                    
                    {/* Information of food wrapper */}

                    <div style = {{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '600px',
                        marginLeft: '70px'
                    }}>
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: '30px'
                        }}>
                            <img style = {{
                                height: '25px',
                                width: '25px',
                                marginRight: '10px'
                            }} src = {heartIcon}></img>
                            <p style = {{
                                color: 'grey'
                            }}>Yêu thích</p>
                        </div>

                        {/* Name of Food Wrapper */}
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '30px'
                        }}>
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: '30px'
                            }}>
                                <p style = {{
                                    fontWeight: 'bold',
                                    fontSize: '30px'
                                }}>{this.state.foodInformation.name}</p>
                                <p style = {{
                                    marginLeft: '20px',
                                    fontSize: '20px'
                                }}>
                                   -     {this.state.foodInformation.description}
                                </p>
                            </div>
                            

                            {/* Status */}
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: '30px'
                            }}>
                                <p style = {{
                                    fontWeight: 'bold',
                                    color: 'green'
                                }}>Còn hàng</p>
                            </div>
                            
                            {/* Price */}
                            <p style = {{
                                fontSize: '22px',
                                fontWeight: 'bold'
                            }}>{this.state.foodInformation.price} vnđ</p>
                            <button style = {{
                                height: '35px',
                                width: '80%',
                                border: 'solid 0.5px ' + orangeColor,
                                borderRadius: '10px',
                                backgroundColor: orangeColor,
                                color: 'white'
                            }} onClick = {() => {
                                this.handleOrder()
                            }}>Đặt ngay</button>
                        </div>
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
                <Footer />
                <Modal show={this.state.isShow} onHide={() => {
                    this.setState({
                        isShow: false
                    })
                }}>
                    <Modal.Header closeButton>
                    <Modal.Title>Xác nhận thêm vào đơn hàng của bạn</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>+ {this.state.foodInformation.name}</p>
                        <p>+ {this.state.foodInformation.description}</p>
                        <p>+ {this.state.foodInformation.price}</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        this.setState({
                            isShow: false
                        });
                    }}>
                        Hủy
                    </Button>
                    <Button style = {{
                        backgroundColor: orangeColor,
                        border: 'solid 0.5px ' + orangeColor
                    }} onClick={() => {
                        this.handleAddToCard()
                    }}>
                        Thêm vào
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default FoodDetail;