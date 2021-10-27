import React, { Component } from "react";
import {
    Navigation,
    Footer
} from '../Components';
import { ScrollView } from "@cantonjs/react-scroll-view";

class DoAn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listFoods: ['1']
        }
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
            const item = this.state.listFoods.map((index, item) => {
                return(
                    <div key = {index}>
                        
                    </div>
                );
            })
            return(
                <div style = {{
                    height: '520px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <p style = {{
                        fontWeight: 'bold',
                        fontSize: '25px'
                    }}>DÁNH SÁCH ĐỒ ĂN</p>
                    <div style = {{
                        height: '85%',
                        width: '80%',
                        border: 'solid 0.2px #e6e6e6',
                        boxShadow: '5px 10px 18px #888888',
                    }}>

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