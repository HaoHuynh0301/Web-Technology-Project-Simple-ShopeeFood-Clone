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
    Profile
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
            </Switch>
        </BrowserRouter>
    ); 
}

export default App;
