import React, {Suspense, lazy} from 'react';

// React-Dom
import {Router, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';

// Components
import GetInputFile from "./GetInputFile";

// Error Page
const Error404Page = lazy(() => import('../ErrorsPages/Error404'));

const history = createBrowserHistory();

const App = () => {

    return (
        <Router history={history}>
            <Suspense fallback={<div>loading...</div>}>
                <Switch>
                    {/* Home  */}
                    <Route exact path={"/"}>
                        <GetInputFile/>
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