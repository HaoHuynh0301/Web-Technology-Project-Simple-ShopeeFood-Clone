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
import { ProtectedRoute } from './protected.route';
import auth from './auth';
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
                <ProtectedRoute exact path = '/home' component = {Home}>
                </ProtectedRoute >
                <Route exact path = '/profile'>
                    <Profile />
                </Route>
                <ProtectedRoute exact path = '/history-order' component = {OrderHistory}>
                </ProtectedRoute>
                <ProtectedRoute exact path = '/detail/:id' component = {FoodDetail}>
                </ProtectedRoute>
                <ProtectedRoute exact path = '/order-instance' component = {OrderInstance}>
                </ProtectedRoute>
                <ProtectedRoute exact path = '/' component = {DoAn}>
                </ProtectedRoute>
                <ProtectedRoute exact path = '/thuc-pham' component = {ThucPham}>
                </ProtectedRoute>
                <ProtectedRoute exact path = '/bia' component = {Bia}>
                </ProtectedRoute>
                <Route path = "*" component = {() => {
                    return(
                        <div>
                            404
                        </div>
                    );
                }}></Route>
            </Switch>
        </BrowserRouter>
    ); 
}

export default App;
