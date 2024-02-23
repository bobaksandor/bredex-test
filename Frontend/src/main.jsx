import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import authReducer, {setUserAndToken} from "./redux/authSlice.js";
import {Provider} from "react-redux";
import Cookies from 'js-cookie';

const token = Cookies.get('jwtToken');


const store = configureStore({
    reducer: {
        auth: authReducer
    },
});

if (token) {

    await fetch('http://localhost:8080/api/v1/auth/get-authenticated-user', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(response => response.json())
        .then(userData => {
            store.dispatch(setUserAndToken({user: userData, token: token}));
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>,
        </BrowserRouter>
    </React.StrictMode>
    ,)