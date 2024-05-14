import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthPage from './AuthPage.jsx';
import {
    setInUsername,
    setInPassword,
    setUpUsername,
    setUpEmail,
    setUpPassword,
    setNotifications,
    clearForm,
} from '../../redux/authReducer.js';
import { server } from '../../serverconf.js';
import axios from 'axios';

const AuthPageContainer = () => {
    const dispatch = useDispatch();
    const [isActive, setActive] = useState(false);

    const handleRegistrationClick = () => {
        setActive(!isActive);
        dispatch(clearForm());
    };

    const inUsername = useSelector((state) => state.authReducer.in_username);
    const inPassword = useSelector((state) => state.authReducer.in_password);
    const upUsername = useSelector((state) => state.authReducer.up_username);
    const upEmail = useSelector((state) => state.authReducer.up_email);
    const upPassword = useSelector((state) => state.authReducer.up_password);

    const handleInUsernameChange = (event) => {
        dispatch(setInUsername(event.target.value));
    };

    const handleInPasswordChange = (event) => {
        dispatch(setInPassword(event.target.value));
    };

    const handleUpUsernameChange = (event) => {
        dispatch(setUpUsername(event.target.value));
    };

    const handleUpEmailChange = (event) => {
        dispatch(setUpEmail(event.target.value));
    };

    const handleUpPasswordChange = (event) => {
        dispatch(setUpPassword(event.target.value));
    };

    const handleNotificationsChange = (event) => {
        dispatch(setNotifications(event.target.checked));
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`${server}/auth/jwt/login`, {
                username: inUsername,
                password: inPassword,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
    };

    const handleRegistrationSubmit = (event) => {
        event.preventDefault();
        axios
            .post('/registration-endpoint', {
                email: upEmail,
                password: upPassword,
                username: upUsername,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
    };

    return (
        <AuthPage
            isActive={isActive}
            handleRegistrationClick={handleRegistrationClick}
            inUsername={inUsername}
            inPassword={inPassword}
            upUsername={upUsername}
            upEmail={upEmail}
            upPassword={upPassword}
            handleInUsernameChange={handleInUsernameChange}
            handleInPasswordChange={handleInPasswordChange}
            handleUpUsernameChange={handleUpUsernameChange}
            handleUpEmailChange={handleUpEmailChange}
            handleUpPasswordChange={handleUpPasswordChange}
            handleNotificationsChange={handleNotificationsChange}
            handleLoginSubmit={handleLoginSubmit}
            handleRegistrationSubmit={handleRegistrationSubmit}
        />
    );
};

export default AuthPageContainer;
