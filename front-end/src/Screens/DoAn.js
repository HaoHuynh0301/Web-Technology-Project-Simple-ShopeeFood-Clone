import React, { Component } from "react";
import {
    Navigation,
    Footer
} from '../Components';
import { ScrollView } from "@cantonjs/react-scroll-view";
import tmpImage from '../assets/hamburger.jpg';
import backgroundImg from '../assets/foodbackground.jpg';
import {
    blueColor,
    orangeColor
} from '../contants';
import {
    Modal,
    Button
} from 'react-bootstrap'
import {
    Link
} from 'react-router-dom';

class DoAn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listFoods: [
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
            instanceFood: {}
        }
    }

    componentDidMount() {

    }

    handleEndReached = () => {
        console.log("load more");
    };

    handleAddToInstanceOrder = () => {
        this.setState({
            isShow: false,
            instanceFood: {}
        })
    }

    handleOrder = (item) => {
        this.setState({
            isShow: true,
            instanceFood: item
        })
    }

    emptyView = () => {
        return(
            <div style = {{
                height: '520px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <p style = {{
                    fontWeight: 'bold'
                }}>Không có sản phẩm hiện tại</p>
            </div>
        );
    }


    mainView = () => {
        if(this.state.listFoods.length < 0) {
            return(
                <div>
                    {this.emptyView()}
                </div>
            );
        } else {
            const item = this.state.listFoods.map((item, index) => {
                return(
                    <div style = {{
                        height: '150px',
                        width: '700px',
                        border: 'solid 0.5px #e6e6e6',
                        borderRadius: '15px',
                        padding: '10px',
                        marginRight: '10px',
                        marginLeft: '10px',
                        marginTop: '10px',
                        marginBottom: '10px',
                        display: 'flex',
                        flexDirection: 'row' 
                    }} key = {index}>
                        <img src = {tmpImage} style = {{
                            borderRadius: '10px',
                            boxShadow: '2px 2px 2px #888888'
                        }}></img>

                        {/* Information of food wrapper */}
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '20px',
                            padding: '10px'
                        }}>
                            <p style = {{
                                fontWeight: 'bold',
                                fontSize: '20px'
                            }}>{item.name}</p>
                            <p>{item.description}</p>
                            <p>Thành phần: {item["categories:"]}</p>
                        </div>
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'row',
                            alignSelf: 'center',
                            marginLeft: '5px'
                        }}>
                            <p style = {{
                                fontWeight: 'bold',
                                color: blueColor,
                                marginTop: '10px'
                            }}>Giá: {item.price} vnđ</p>
                            <Link to = {'/detail/' + item.id}  style = {{
                                border: 'solid 0.5px white',
                                backgroundColor: orangeColor,
                                marginLeft: '10px',
                                height: '40px',
                                width: '40px',
                                fontWeight: 'bold',
                                color: 'white',
                                borderRadius: '20px',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textDecoration: 'none'
                            }}>
                                ...
                            </Link>
                        </div>
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
                    backgroundImage: `url(${backgroundImg})`,
                    boxShadow: '5px 10px 18px #888888'
                }}>
                    <div style = {{
                        backgroundColor: 'white',
                        opacity: '1'
                    }}>
                        <ScrollView onEndReached={this.handleEndReached} style = {{
                            height: '450px',
                            boxShadow: '5px 10px 18px #888888',
                        }}>
                            {item}
                        </ScrollView>
                    </div>
                    
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

export default DoAn;