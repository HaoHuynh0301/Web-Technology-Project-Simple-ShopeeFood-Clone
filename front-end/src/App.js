import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter
} from "react-router-dom";
import {
    Login,
    Register,
    Home,
    Profile,
    OrderHistory,
    FoodDetail,
    OrderInstance,
    DoAn,
    ThucPham,
    Bia
} from './Screens';
const localStorage = require('local-storage');
const axios = require('axios');

function App() {
    
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path = '/login'>
                    <Login />
                </Route>
                <Route exact path = '/register'>
                    <Register />
                </Route>
                <Route exact path = '/home'>
                    <Home />
                </Route>
                <Route exact path = '/profile'>
                    <Profile />
                </Route>
                <Route exact path = '/history-order'>
                    <OrderHistory />
                </Route>
                <Route exact path = '/detail/:id'>
                    <FoodDetail />
                </Route>
                <Route exact path = '/order-instance'>
                    <OrderInstance />
                </Route>
                <Route exact path = '/'>
                    <DoAn />
                </Route>
                <Route exact path = '/thuc-pham'>
                    <ThucPham />
                </Route>
                <Route exact path = '/bia'>
                    <Bia />
                </Route>
            </Switch>
        </BrowserRouter>
    ); 
}

export default App;
