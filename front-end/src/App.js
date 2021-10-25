import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter
} from "react-router-dom";
import {
    Login
} from './Screens';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path = '/login'>
                    <Login />
                </Route>
            </Switch>
        </BrowserRouter>
    ); 
}

export default App;
