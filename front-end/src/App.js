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
    DoAn
} from './Screens';

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
                <Route path = '/'>
                    <DoAn />
                </Route>
            </Switch>
        </BrowserRouter>
    ); 
}

export default App;
