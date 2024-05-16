import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRequest } from '../../redux/headerReducer.js';
import Header from './Header.jsx';
import PreferencesCheck from '../PreferencesCheck.jsx';

const HeaderContainer = () => {
    const dispatch = useDispatch();

    const requestText = useSelector((state) => state.headerReducer.request);
    const handleTextChange = (event) => {
        dispatch(setRequest(event.target.value));
    };

    const handleClearClick = () => {
        dispatch(setRequest(''));
    };

    return (
        <>
            <PreferencesCheck />
            <Header
                requestText={requestText}
                handleTextChange={handleTextChange}
                handleClearClick={handleClearClick}
            />
        </>
    );
};

export default HeaderContainer;
