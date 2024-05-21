import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccUsername, setAccEmail, setAccPassword } from '../../redux/accountReducer.js';
import Account from './Account.jsx';
import SessionChecker from '../SessionChecker.jsx';
import axios from 'axios';
import { server } from '../../serverconf.js';

const AccountContainer = () => {
    const dispatch = useDispatch();

    const username = useSelector((state) => state.accountReducer.acc_username);
    const email = useSelector((state) => state.accountReducer.acc_email);
    const password = useSelector((state) => state.accountReducer.password);

    const handleEditAccUsername = (event) => {
        dispatch(setAccUsername(event.target.value));
    };

    const handleEditAccEmail = (event) => {
        dispatch(setAccEmail(event.target.value));
    };

    const handleEditAccPassword = (event) => {
        dispatch(setAccPassword(event.target.value));
    };

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${server}/users/me`);
                console.log(response);
                if (response.status === 200) {
                    dispatch(setAccEmail(response.data.email));
                    dispatch(setAccUsername(response.data.username));
                }
            } catch (error) {
                console.log('error get userdata', error);
            }
        };

        fetchUserData();
    }, [dispatch]);

    return (
        <>
            <SessionChecker />
            <Account
                username={username}
                email={email}
                password={password}
                handleEditAccEmail={handleEditAccEmail}
                handleEditAccUsername={handleEditAccUsername}
                handleEditAccPassword={handleEditAccPassword}
                toggleShowPassword={toggleShowPassword}
                showPassword={showPassword}
            />
        </>
    );
};

export default AccountContainer;
