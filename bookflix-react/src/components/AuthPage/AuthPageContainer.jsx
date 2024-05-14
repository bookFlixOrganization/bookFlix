import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthPage from './AuthPage.jsx';
import {
    setInUsername,
    setInPassword,
    setUpUsername,
    setUpEmail,
    setUpPassword,
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

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        if (!inUsername || !inPassword) {
            console.error('Логин и пароль должны быть заполнены');
            return;
        }
        axios
            .post(`${server}/auth/jwt/login`, {
                username: inUsername,
                password: inPassword,
            })
            .then((response) => {
                // Обработка ответа от сервера
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
    };

    const handleRegistrationSubmit = (event) => {
        event.preventDefault();
        if (!upUsername || !upPassword || !upEmail) {
            console.error('Логин, пароль и email должны быть заполнены');
            return;
        }
        axios
            .post(`${server}/auth/register`, {
                email: upEmail,
                password: upPassword,
                username: upUsername,
                role_id: 1,
            })
            .then((response) => {
                // Обработка ответа от сервера
                // console.log(response.data);
                alert('ura', response.data);
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
            handleLoginSubmit={handleLoginSubmit}
            handleRegistrationSubmit={handleRegistrationSubmit}
        />
    );
};

export default AuthPageContainer;
