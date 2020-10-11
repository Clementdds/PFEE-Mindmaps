import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/Css/index.css';
import App from './Layout/App';

// Redux and Store
import {Provider} from "react-redux";
import store from "./Store/ConfigureStore";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById('root')
);
