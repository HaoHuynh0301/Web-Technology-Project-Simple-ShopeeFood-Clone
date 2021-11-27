import {
    BrowserRouter as Router,
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";
import {
    Login,
    Register,
    Profile,
    OrderHistory,
    FoodDetail,
    OrderInstance,
    DoAn,
    ThucPham,
    Bia,
    Voucher
} from './Screens';
import { ProtectedRoute } from './protected.route';

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
                <ProtectedRoute exact path = '/profile' component = {Profile}>
                </ProtectedRoute>
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
                <ProtectedRoute exact path = '/voucher' component = {Voucher}>
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
