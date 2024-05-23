import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthPage from './AuthPage.jsx';
import {
    setInUsername,
    setInPassword,
    setUpUsername,
    setUpEmail,
    setUpPassword,
    clearForm,
} from '../../redux/authReducer.js';
import {
    setId,
    setEmail,
    setSuperuser,
    setIsAuth,
    setRoleId,
    setActive,
    setPreferences,
    setVerified,
    setUsername,
} from '../../redux/sessionReducer.js';

import { server } from '../../serverconf.js';
import axios from 'axios';
import qs from 'qs';

const AuthPageContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isActive, setButtonActive] = useState(false);

    const handleRegistrationClick = () => {
        setButtonActive(!isActive);
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

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        if (!inUsername || !inPassword) {
            alert('Логин и пароль должны быть заполнены');
            return;
        }

        const data = {
            username: inUsername,
            password: inPassword,
        };

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify(data),
            url: `${server}/auth/jwt/login`,
        };

        try {
            const response = await axios(options);
            if (response.status === 204 || response.status === 200) {
                dispatch(clearForm());
                alert('success');
                const userResponse = await axios.get(`${server}/users/me`);
                const userData = userResponse.data;
                dispatch(setId(userData.id));
                dispatch(setEmail(userData.email));
                dispatch(setActive(userData.is_active));
                dispatch(setSuperuser(userData.is_superuser));
                dispatch(setVerified(userData.is_verified));
                dispatch(setUsername(userData.username));
                dispatch(setRoleId(userData.role_id));
                dispatch(setPreferences(userData.is_preferences));
                dispatch(setIsAuth(true));
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 422) {
                    alert('Ошибка входа: неверный логин или пароль');
                } else {
                    alert('Ошибка сервера');
                }
            }
        }
    };

    const handleRegistrationSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!upUsername || !upPassword || !upEmail) {
                alert('Логин, пароль и email должны быть заполнены');
                return;
            }
            const registerResponse = await axios.post(`${server}/auth/register`, {
                email: upEmail,
                password: upPassword,
                username: upUsername,
                role_id: 1,
            });

            if (registerResponse.status === 201) {
                dispatch(clearForm());
                handleRegistrationClick();
                alert('Пользователь успешно зарегистрирован');
            } else {
                // Обработка ошибок сервера
                alert('Произошла ошибка при регистрации');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    alert('Введенные данные не валидны (либо пароль слишком простой)');
                } else if (error.response.status === 400) {
                    alert('Пользователь уже существует');
                }
            } else if (error.request) {
                // Запрос был выполнен, но не получен ответ
                alert('Произошла сетевая ошибка при регистрации');
            } else {
                // Возникла ошибка при настройке запроса
                alert('Произошла ошибка при регистрации');
            }
        }
    };
    const isPrefences = useSelector((state) => state.sessionReducer.is_preferences);
    const isAuth = useSelector((state) => state.sessionReducer.is_auth);
    useEffect(() => {
        if (!isPrefences && isAuth) {
            navigate('/preferences');
        } else if (!isAuth) {
            navigate('/auth');
        } else {
            navigate('/');
        }
    }, [isPrefences, isAuth]);
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
