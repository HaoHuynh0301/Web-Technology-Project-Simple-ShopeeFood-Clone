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
    Home
} from './Screens';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path = '/login'>
                    <Login />
                </Route>
                <Route path = '/register'>
                    <Register />
                </Route>
                <Route path = '/home'>
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    ); 
}

export default App;
