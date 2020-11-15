import React, {Suspense, lazy} from 'react';

// React-Dom
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

// Components
import Header from "./Header";
import PrivateRoute from "../Components/Private/PrivateRoute";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import HomePage from "./HomePage";
import PublicMindmap from "./PublicMindmap";
import MindmapById from "./MindmapById";
import PrivateRouteWithParams from "../Components/Private/PrivateRouteWithParams";
import FormNewMindmap from "./FormNewMindmap";

// Error Page
const Error404Page = lazy(() => import('../Components/ErrorsPages/Error404'));

const App = () => {

    return (
        <Router>
            <Suspense fallback={<div>loading...</div>}>
                <Header/>
                <Switch>
                    {/* Home  */}
                    <PrivateRoute exact path={"/"}>
                        <HomePage/>
                    </PrivateRoute>

                    {/* Home  */}
                    <PrivateRoute exact path={"/form"}>
                        <FormNewMindmap/>
                    </PrivateRoute>

                    {/* Login  */}
                    <Route exact path={"/login"}>
                        <LoginPage/>
                    </Route>

                    {/* Sign Up  */}
                    <Route exact path={"/sign"}>
                        <SignUpPage/>
                    </Route>

                    {/* Mindmap by Id  */}
                    <PrivateRouteWithParams path={"/mindmap/:id"} component={MindmapById}/>

                    {/* Mindmap by Url  */}
                    <Route path={"/links/:url"} component={PublicMindmap}/>

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