// AccountContainer.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccEmail, setAccPassword, setAccId } from '../../../redux/Me/accountReducer.js';
import Account from './Account.jsx';
import axios from 'axios';
import { server } from '../../../serverconf.js';

const AccountContainer = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.accountReducer.acc_id);
    const email = useSelector((state) => state.accountReducer.acc_email);
    const password = useSelector((state) => state.accountReducer.password);
    const [showPassword, setShowPassword] = useState(false);

    const handleEditAccEmail = (event) => {
        dispatch(setAccEmail(event.target.value));
    };

    const handleEditAccPassword = (event) => {
        dispatch(setAccPassword(event.target.value));
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            try {
                const response = await axios.patch(`${server}/users/me`, {
                    password: password,
                    email: email,
                    is_active: true,
                    is_superuser: true,
                    is_verified: true,
                });
                if (response.status === 200) {
                    alert('Success');
                }
            } catch (error) {
                console.log('error update userdata', error);
            }
        },
        [userId, password, email],
    );

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${server}/users/me`);
                if (response.status === 200) {
                    dispatch(setAccId(response.data.id));
                    dispatch(setAccEmail(response.data.email));
                }
            } catch (error) {
                console.log('error get userdata', error);
            }
        };

        fetchUserData();
    }, [dispatch]);

    return (
        <Account
            email={email}
            password={password}
            handleEditAccEmail={handleEditAccEmail}
            handleEditAccPassword={handleEditAccPassword}
            toggleShowPassword={toggleShowPassword}
            showPassword={showPassword}
            handleSubmit={handleSubmit}
        />
    );
};

export default AccountContainer;
