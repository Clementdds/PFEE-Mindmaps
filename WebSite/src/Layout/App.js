import React, {Suspense, lazy} from 'react';

// React-Dom
import {Router, Switch, Route} from 'react-router-dom';

// Components
import Header from "./Header";
import PrivateRoute from "../Components/Routes/PrivateRoute";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import history from "../Helpers/History";
import HomePage from "./HomePage";

// Error Page
const Error404Page = lazy(() => import('../Components/ErrorsPages/Error404'));

const App = () => {

    return (
        <Router history={history}>
            <Suspense fallback={<div>loading...</div>}>
                <Header/>
                <Switch>
                    {/* Home  */}
                    <PrivateRoute exact path={"/"}>
                        <HomePage/>
                    </PrivateRoute>

                    {/* Login  */}
                    <Route exact path={"/login"}>
                        <LoginPage/>
                    </Route>

                    {/* Sign Up  */}
                    <Route exact path={"/sign"}>
                        <SignUpPage/>
                    </Route>

                    {/* 404  */}
                    <Route>
                        <Error404Page/>
                    </Route>
                </Switch>
            </Suspense>
        </Router>
    );
};


export default App;