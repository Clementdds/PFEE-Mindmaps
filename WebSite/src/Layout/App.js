import React, {Suspense, lazy} from 'react';

// React-Dom
import {Switch, Route, BrowserRouter} from 'react-router-dom';

// Components
import Header from "./Header";
import PrivateRoute from "../Components/Private/PrivateRoute";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import HomePage from "./HomePage";
import PublicMindmapByUrl from "./PublicMindmapByUrl";
import PrivateMindmapByUrl from "./PrivateMindmapByUrl";
import MindmapById from "./MindmapById";
import PrivateRouteWithParams from "../Components/Private/PrivateRouteWithParams";
import FormNewMindmap from "./FormNewMindmap";

// Error Page
const Error404Page = lazy(() => import('../Components/ErrorsPages/Error404'));

const App = () => {

    return (
        <BrowserRouter>
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

                    {/* Private Mindmap by Url  */}
                    <PrivateRouteWithParams path={"/links/private/:url"} component={PrivateMindmapByUrl}/>

                    {/* Public Mindmap by Url  */}
                    <Route path={"/links/public/:url"} component={PublicMindmapByUrl}/>

                    {/* 404  */}
                    <Route>
                        <Error404Page/>
                    </Route>
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};


export default App;