import React, { Component } from "react";
import {
    Navigation,
    Footer
} from '../Components';

class OrderInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    mainView = () => {
        return(
            <div style = {{
                height: '635px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style = {{
                    border: 'solid 0.2px #e6e6e6',
                    boxShadow: '5px 10px 18px #888888',
                    height: '90%',
                    width: '80%'
                }}></div>
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